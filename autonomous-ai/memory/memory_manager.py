#!/usr/bin/env python3
"""
LUXBIN Memory System - Phase 3 Implementation
Advanced memory management for persistent conversations, user profiling, and semantic recall
No external APIs required - everything local and private
"""

import os
import json
import sqlite3
import hashlib
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional, Tuple
from pathlib import Path
import logging
import threading
from collections import defaultdict

logger = logging.getLogger(__name__)

class LuxbinMemoryManager:
    """Comprehensive memory system for LUXBIN AI"""

    def __init__(self, db_path: str = "./luxbin_memory.db", memory_dir: str = "./memory"):
        self.db_path = Path(db_path)
        self.memory_dir = Path(memory_dir)
        self.memory_dir.mkdir(exist_ok=True)

        # Initialize database
        self._init_database()

        # Memory caches for performance
        self.conversation_cache = {}
        self.user_cache = {}
        self.semantic_cache = {}

        # Memory limits
        self.max_conversations_per_user = 1000
        self.max_session_messages = 50
        self.semantic_cache_size = 100

        # Background cleanup thread
        self.cleanup_thread = threading.Thread(target=self._background_cleanup, daemon=True)
        self.cleanup_thread.start()

        logger.info("LUXBIN Memory Manager initialized")

    def _init_database(self):
        """Initialize SQLite database for persistent memory"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            # Users table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    user_id TEXT PRIMARY KEY,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    total_interactions INTEGER DEFAULT 0,
                    preferences TEXT,  -- JSON string
                    personality_profile TEXT,  -- JSON string
                    trust_score REAL DEFAULT 0.5,
                    expertise_level TEXT DEFAULT 'beginner'
                )
            ''')

            # Conversations table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS conversations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id TEXT NOT NULL,
                    session_id TEXT NOT NULL,
                    message_type TEXT NOT NULL,  -- 'user' or 'assistant'
                    content TEXT NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    metadata TEXT,  -- JSON string with function calls, etc.
                    photonic_encoding TEXT,  -- Photonic representation
                    sentiment REAL,  -- Sentiment analysis score
                    topics TEXT,  -- Comma-separated topics
                    FOREIGN KEY (user_id) REFERENCES users(user_id)
                )
            ''')

            # Memory embeddings table (for semantic search)
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS memory_embeddings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    conversation_id INTEGER,
                    content_hash TEXT UNIQUE,
                    embedding_vector TEXT,  -- JSON array of floats
                    topics TEXT,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
                )
            ''')

            # User preferences table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS user_preferences (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id TEXT NOT NULL,
                    preference_key TEXT NOT NULL,
                    preference_value TEXT,
                    confidence REAL DEFAULT 1.0,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, preference_key),
                    FOREIGN KEY (user_id) REFERENCES users(user_id)
                )
            ''')

            # Learning insights table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS learning_insights (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id TEXT,
                    insight_type TEXT,
                    insight_data TEXT,  -- JSON
                    confidence REAL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')

            conn.commit()
        logger.info("Database initialized successfully")

    # ===== USER MANAGEMENT =====

    def get_or_create_user(self, user_id: str) -> Dict[str, Any]:
        """Get or create user profile"""
        if user_id in self.user_cache:
            return self.user_cache[user_id]

        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            # Try to get existing user
            cursor.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
            row = cursor.fetchone()

            if row:
                user_data = {
                    'user_id': row[0],
                    'created_at': row[1],
                    'last_seen': row[2],
                    'total_interactions': row[3],
                    'preferences': json.loads(row[4]) if row[4] else {},
                    'personality_profile': json.loads(row[5]) if row[5] else {},
                    'trust_score': row[6],
                    'expertise_level': row[7]
                }
            else:
                # Create new user
                user_data = {
                    'user_id': user_id,
                    'created_at': datetime.now().isoformat(),
                    'last_seen': datetime.now().isoformat(),
                    'total_interactions': 0,
                    'preferences': {},
                    'personality_profile': {
                        'helpfulness': 0.8,
                        'technical_level': 0.5,
                        'communication_style': 'balanced',
                        'preferred_topics': []
                    },
                    'trust_score': 0.5,
                    'expertise_level': 'beginner'
                }

                cursor.execute("""
                    INSERT INTO users (user_id, preferences, personality_profile, trust_score, expertise_level)
                    VALUES (?, ?, ?, ?, ?)
                """, (
                    user_data['user_id'],
                    json.dumps(user_data['preferences']),
                    json.dumps(user_data['personality_profile']),
                    user_data['trust_score'],
                    user_data['expertise_level']
                ))
                conn.commit()

            # Update last seen
            cursor.execute(
                "UPDATE users SET last_seen = ? WHERE user_id = ?",
                (datetime.now().isoformat(), user_id)
            )
            conn.commit()

        self.user_cache[user_id] = user_data
        return user_data

    def update_user_profile(self, user_id: str, updates: Dict[str, Any]):
        """Update user profile with new information"""
        user = self.get_or_create_user(user_id)

        # Update in-memory cache
        for key, value in updates.items():
            if key in user:
                user[key] = value

        # Update database
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            if 'preferences' in updates:
                cursor.execute(
                    "UPDATE users SET preferences = ? WHERE user_id = ?",
                    (json.dumps(updates['preferences']), user_id)
                )

            if 'personality_profile' in updates:
                cursor.execute(
                    "UPDATE users SET personality_profile = ? WHERE user_id = ?",
                    (json.dumps(updates['personality_profile']), user_id)
                )

            if 'trust_score' in updates:
                cursor.execute(
                    "UPDATE users SET trust_score = ? WHERE user_id = ?",
                    (updates['trust_score'], user_id)
                )

            if 'expertise_level' in updates:
                cursor.execute(
                    "UPDATE users SET expertise_level = ? WHERE user_id = ?",
                    (updates['expertise_level'], user_id)
                )

            conn.commit()

        logger.info(f"Updated user profile for {user_id}")

    # ===== CONVERSATION MEMORY =====

    def store_conversation(self, user_id: str, session_id: str, message_type: str,
                          content: str, metadata: Dict[str, Any] = None) -> int:
        """Store a conversation message"""
        user = self.get_or_create_user(user_id)

        # Analyze content for metadata
        if metadata is None:
            metadata = {}

        # Add automatic analysis
        metadata.update(self._analyze_message_content(content))

        # Store in database
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            cursor.execute("""
                INSERT INTO conversations
                (user_id, session_id, message_type, content, metadata, photonic_encoding, sentiment, topics)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                user_id,
                session_id,
                message_type,
                content,
                json.dumps(metadata),
                metadata.get('photonic_encoding', ''),
                metadata.get('sentiment', 0.0),
                ','.join(metadata.get('topics', []))
            ))

            conversation_id = cursor.lastrowid

            # Update user interaction count
            cursor.execute(
                "UPDATE users SET total_interactions = total_interactions + 1 WHERE user_id = ?",
                (user_id,)
            )

            conn.commit()

        # Update cache
        self.conversation_cache.pop(user_id, None)  # Invalidate cache

        # Update user preferences based on conversation
        self._update_user_preferences_from_message(user_id, content, message_type)

        return conversation_id

    def get_conversation_history(self, user_id: str, limit: int = 20,
                               session_id: str = None) -> List[Dict[str, Any]]:
        """Get conversation history for a user"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            if session_id:
                cursor.execute("""
                    SELECT id, session_id, message_type, content, timestamp, metadata
                    FROM conversations
                    WHERE user_id = ? AND session_id = ?
                    ORDER BY timestamp DESC
                    LIMIT ?
                """, (user_id, session_id, limit))
            else:
                cursor.execute("""
                    SELECT id, session_id, message_type, content, timestamp, metadata
                    FROM conversations
                    WHERE user_id = ?
                    ORDER BY timestamp DESC
                    LIMIT ?
                """, (user_id, limit))

            rows = cursor.fetchall()

        # Convert to dictionaries
        conversations = []
        for row in rows:
            conversations.append({
                'id': row[0],
                'session_id': row[1],
                'message_type': row[2],
                'content': row[3],
                'timestamp': row[4],
                'metadata': json.loads(row[5]) if row[5] else {}
            })

        return conversations[::-1]  # Reverse to chronological order

    def get_session_context(self, user_id: str, session_id: str,
                           current_message_id: int = None) -> Dict[str, Any]:
        """Get full context for a conversation session"""
        conversations = self.get_conversation_history(user_id, limit=50, session_id=session_id)

        context = {
            'session_id': session_id,
            'total_messages': len(conversations),
            'messages': conversations,
            'topics_discussed': set(),
            'function_calls_made': [],
            'photonic_encodings': [],
            'sentiment_trend': []
        }

        for conv in conversations:
            metadata = conv['metadata']

            # Collect topics
            if 'topics' in metadata:
                context['topics_discussed'].update(metadata['topics'])

            # Collect function calls
            if 'function_calls' in metadata:
                context['function_calls_made'].extend(metadata['function_calls'])

            # Collect photonic encodings
            if 'photonic_encoding' in metadata and metadata['photonic_encoding']:
                context['photonic_encodings'].append(metadata['photonic_encoding'])

            # Collect sentiment
            if 'sentiment' in metadata:
                context['sentiment_trend'].append(metadata['sentiment'])

        context['topics_discussed'] = list(context['topics_discussed'])

        return context

    # ===== SEMANTIC MEMORY =====

    def search_conversations(self, user_id: str, query: str,
                           limit: int = 5) -> List[Dict[str, Any]]:
        """Search through user's conversation history semantically"""
        # Simple keyword-based search (can be enhanced with embeddings later)
        conversations = self.get_conversation_history(user_id, limit=100)

        results = []
        query_lower = query.lower()

        for conv in conversations:
            content_lower = conv['content'].lower()

            # Simple relevance scoring
            relevance = 0
            if query_lower in content_lower:
                relevance = 1.0
            elif any(word in content_lower for word in query_lower.split()):
                relevance = 0.5

            if relevance > 0:
                result = conv.copy()
                result['relevance_score'] = relevance
                result['matched_content'] = self._extract_relevant_snippet(conv['content'], query)
                results.append(result)

        # Sort by relevance and recency
        results.sort(key=lambda x: (x['relevance_score'], x['timestamp']), reverse=True)

        return results[:limit]

    def find_similar_conversations(self, user_id: str, current_topic: str,
                                 limit: int = 3) -> List[Dict[str, Any]]:
        """Find conversations with similar topics or content"""
        # Get recent conversations and find similar ones
        recent_convs = self.get_conversation_history(user_id, limit=20)

        similar = []
        current_words = set(current_topic.lower().split())

        for conv in recent_convs:
            conv_words = set(conv['content'].lower().split())
            similarity = len(current_words.intersection(conv_words)) / len(current_words.union(conv_words))

            if similarity > 0.1:  # Minimum similarity threshold
                conv_copy = conv.copy()
                conv_copy['similarity_score'] = similarity
                similar.append(conv_copy)

        similar.sort(key=lambda x: x['similarity_score'], reverse=True)
        return similar[:limit]

    # ===== USER PREFERENCES & LEARNING =====

    def update_user_preference(self, user_id: str, key: str, value: Any, confidence: float = 1.0):
        """Update a specific user preference"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            cursor.execute("""
                INSERT OR REPLACE INTO user_preferences
                (user_id, preference_key, preference_value, confidence, last_updated)
                VALUES (?, ?, ?, ?, ?)
            """, (
                user_id,
                key,
                json.dumps(value) if not isinstance(value, str) else value,
                confidence,
                datetime.now().isoformat()
            ))

            conn.commit()

        # Update cache
        user = self.get_or_create_user(user_id)
        user['preferences'][key] = value

    def get_user_preference(self, user_id: str, key: str) -> Optional[Any]:
        """Get a user preference"""
        user = self.get_or_create_user(user_id)
        return user['preferences'].get(key)

    def get_user_preferences(self, user_id: str) -> Dict[str, Any]:
        """Get all user preferences"""
        user = self.get_or_create_user(user_id)
        return user['preferences']

    def learn_from_interaction(self, user_id: str, interaction_data: Dict[str, Any]):
        """Learn patterns from user interactions"""
        insight = {
            'interaction_type': interaction_data.get('type', 'general'),
            'topics': interaction_data.get('topics', []),
            'sentiment': interaction_data.get('sentiment', 0.0),
            'function_used': interaction_data.get('function_calls', []),
            'response_quality': interaction_data.get('response_quality', 0.5),
            'learning_data': interaction_data
        }

        # Store learning insight
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO learning_insights
                (user_id, insight_type, insight_data, confidence)
                VALUES (?, ?, ?, ?)
            """, (
                user_id,
                insight['interaction_type'],
                json.dumps(insight),
                insight.get('response_quality', 0.5)
            ))
            conn.commit()

        # Update user profile based on learning
        self._update_user_profile_from_learning(user_id, insight)

    # ===== PRIVATE HELPER METHODS =====

    def _analyze_message_content(self, content: str) -> Dict[str, Any]:
        """Analyze message content for metadata"""
        analysis = {
            'word_count': len(content.split()),
            'has_code': '```' in content,
            'has_questions': '?' in content,
            'sentiment': self._simple_sentiment_analysis(content),
            'topics': self._extract_topics(content),
            'complexity': self._calculate_complexity(content)
        }

        # Photonic encoding (if code present)
        if analysis['has_code']:
            from photonic_encoder import LuxbinPhotonicEncoder
            encoder = LuxbinPhotonicEncoder()
            # Extract code blocks and encode
            import re
            code_blocks = re.findall(r'```(?:\w+)?\n(.*?)\n```', content, re.DOTALL)
            if code_blocks:
                encoding = encoder.encode_code_to_photonic(code_blocks[0][:500])  # First code block
                analysis['photonic_encoding'] = encoding.get('photonic_code', '')[:100]

        return analysis

    def _simple_sentiment_analysis(self, text: str) -> float:
        """Simple sentiment analysis (positive = 1.0, negative = -1.0)"""
        positive_words = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'perfect', 'love', 'awesome']
        negative_words = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointed']

        words = text.lower().split()
        positive_count = sum(1 for word in words if word in positive_words)
        negative_count = sum(1 for word in words if word in negative_words)

        total = positive_count + negative_count
        if total == 0:
            return 0.0

        return (positive_count - negative_count) / total

    def _extract_topics(self, text: str) -> List[str]:
        """Extract topics from text"""
        topics = []

        # LUXBIN-specific topics
        luxbin_topics = {
            'quantum': ['quantum', 'cryptography', 'encryption'],
            'blockchain': ['blockchain', 'transaction', 'contract', 'ethereum', 'polygon'],
            'ai': ['ai', 'assistant', 'chatbot', 'learning', 'memory'],
            'security': ['security', 'threat', 'vulnerability', 'audit'],
            'photonic': ['photonic', 'light', 'encoding', 'speed'],
            'temporal': ['temporal', 'time', 'key', 'derivation']
        }

        text_lower = text.lower()
        for topic, keywords in luxbin_topics.items():
            if any(keyword in text_lower for keyword in keywords):
                topics.append(topic)

        return topics

    def _calculate_complexity(self, text: str) -> float:
        """Calculate text complexity score"""
        words = text.split()
        avg_word_length = sum(len(word) for word in words) / len(words) if words else 0
        unique_words = len(set(words))
        total_words = len(words)

        # Complexity factors
        length_factor = min(total_words / 100, 1.0)  # 0-1 based on length
        vocabulary_factor = unique_words / total_words if total_words > 0 else 0
        word_length_factor = min(avg_word_length / 8, 1.0)  # 0-1 based on word length

        return (length_factor + vocabulary_factor + word_length_factor) / 3

    def _update_user_preferences_from_message(self, user_id: str, content: str, message_type: str):
        """Update user preferences based on message content"""
        if message_type == 'user':
            topics = self._extract_topics(content)

            # Update topic preferences
            for topic in topics:
                current_pref = self.get_user_preference(user_id, f'topic_{topic}') or 0
                self.update_user_preference(user_id, f'topic_{topic}', current_pref + 1, 0.8)

            # Update communication style preferences
            if '?' in content:
                self.update_user_preference(user_id, 'asks_questions', True, 0.9)

            if '```' in content:
                self.update_user_preference(user_id, 'shares_code', True, 0.9)

            if len(content.split()) > 50:
                self.update_user_preference(user_id, 'detailed_questions', True, 0.7)

    def _update_user_profile_from_learning(self, user_id: str, insight: Dict[str, Any]):
        """Update user profile based on learning insights"""
        # Update expertise level based on topics and complexity
        topics = insight.get('topics', [])
        if topics:
            current_expertise = self.get_user_preference(user_id, 'expertise_level') or 'beginner'

            # Simple expertise progression
            if current_expertise == 'beginner' and len(topics) > 2:
                self.update_user_profile(user_id, {'expertise_level': 'intermediate'})
            elif current_expertise == 'intermediate' and insight.get('response_quality', 0) > 0.8:
                self.update_user_profile(user_id, {'expertise_level': 'advanced'})

        # Update personality profile
        user = self.get_or_create_user(user_id)
        personality = user['personality_profile']

        # Adapt based on interaction patterns
        if insight.get('interaction_type') == 'technical_question':
            personality['technical_level'] = min(1.0, personality['technical_level'] + 0.1)

        if insight.get('sentiment', 0) > 0.5:
            personality['helpfulness'] = min(1.0, personality['helpfulness'] + 0.05)

        self.update_user_profile(user_id, {'personality_profile': personality})

    def _background_cleanup(self):
        """Background cleanup of old data"""
        while True:
            try:
                # Clean up old conversation cache
                if len(self.conversation_cache) > 10:
                    # Remove oldest entries
                    oldest_keys = list(self.conversation_cache.keys())[:5]
                    for key in oldest_keys:
                        del self.conversation_cache[key]

                # Clean up semantic cache
                if len(self.semantic_cache) > self.semantic_cache_size:
                    # Remove oldest entries
                    oldest_keys = list(self.semantic_cache.keys())[:20]
                    for key in oldest_keys:
                        del self.semantic_cache[key]

            except Exception as e:
                logger.error(f"Background cleanup error: {e}")

            # Sleep for 5 minutes
            import time
            time.sleep(300)

    # ===== PUBLIC API METHODS =====

    def get_memory_stats(self) -> Dict[str, Any]:
        """Get memory system statistics"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            # User stats
            cursor.execute("SELECT COUNT(*) FROM users")
            total_users = cursor.fetchone()[0]

            # Conversation stats
            cursor.execute("SELECT COUNT(*) FROM conversations")
            total_conversations = cursor.fetchone()[0]

            cursor.execute("""
                SELECT user_id, COUNT(*) as msg_count
                FROM conversations
                GROUP BY user_id
                ORDER BY msg_count DESC
                LIMIT 1
            """)
            most_active = cursor.fetchone()
            most_active_user = most_active[0] if most_active else None
            most_active_count = most_active[1] if most_active else 0

            # Memory stats
            cursor.execute("SELECT COUNT(*) FROM memory_embeddings")
            total_embeddings = cursor.fetchone()[0]

        return {
            'total_users': total_users,
            'total_conversations': total_conversations,
            'total_embeddings': total_embeddings,
            'most_active_user': most_active_user,
            'most_active_message_count': most_active_count,
            'cache_size': len(self.conversation_cache),
            'semantic_cache_size': len(self.semantic_cache),
            'db_size_mb': self.db_path.stat().st_size / (1024 * 1024) if self.db_path.exists() else 0
        }

    def export_user_data(self, user_id: str) -> Dict[str, Any]:
        """Export all user data for backup/privacy"""
        user = self.get_or_create_user(user_id)
        conversations = self.get_conversation_history(user_id, limit=1000)
        preferences = self.get_user_preferences(user_id)

        return {
            'user_profile': user,
            'conversations': conversations,
            'preferences': preferences,
            'export_timestamp': datetime.now().isoformat()
        }

    def clear_user_data(self, user_id: str):
        """Clear all data for a user (privacy compliance)"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            # Delete user data
            cursor.execute("DELETE FROM conversations WHERE user_id = ?", (user_id,))
            cursor.execute("DELETE FROM user_preferences WHERE user_id = ?", (user_id,))
            cursor.execute("DELETE FROM learning_insights WHERE user_id = ?", (user_id,))
            cursor.execute("DELETE FROM users WHERE user_id = ?", (user_id,))

            conn.commit()

        # Clear caches
        self.user_cache.pop(user_id, None)
        self.conversation_cache.pop(user_id, None)

        logger.info(f"Cleared all data for user {user_id}")


# Convenience functions
def get_memory_manager() -> LuxbinMemoryManager:
    """Get the global memory manager instance"""
    if not hasattr(get_memory_manager, '_instance'):
        get_memory_manager._instance = LuxbinMemoryManager()
    return get_memory_manager._instance

def store_conversation(user_id: str, session_id: str, message_type: str, content: str) -> int:
    """Store a conversation message"""
    return get_memory_manager().store_conversation(user_id, session_id, message_type, content)

def search_conversations(user_id: str, query: str, limit: int = 5) -> List[Dict[str, Any]]:
    """Search user conversations"""
    return get_memory_manager().search_conversations(user_id, query, limit)

def get_user_preferences(user_id: str) -> Dict[str, Any]:
    """Get user preferences"""
    return get_memory_manager().get_user_preferences(user_id)

def update_user_preference(user_id: str, key: str, value: Any):
    """Update user preference"""
    return get_memory_manager().update_user_preference(user_id, key, value)


if __name__ == "__main__":
    # Test the memory system
    memory = LuxbinMemoryManager()

    print("LUXBIN Memory System initialized")

    # Test user creation
    user = memory.get_or_create_user("test_user")
    print(f"Created user: {user['user_id']}")

    # Test conversation storage
    conv_id = memory.store_conversation("test_user", "session_1", "user", "Hello, how does quantum cryptography work?")
    print(f"Stored conversation with ID: {conv_id}")

    # Test conversation retrieval
    conversations = memory.get_conversation_history("test_user", limit=5)
    print(f"Retrieved {len(conversations)} conversations")

    # Test search
    results = memory.search_conversations("test_user", "quantum")
    print(f"Search results: {len(results)} matches")

    # Show stats
    stats = memory.get_memory_stats()
    print(f"Memory stats: {stats}")