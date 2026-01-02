# 🤖 Luxbin Autonomous AI System

**Phase 1: RAG (Retrieval-Augmented Generation) Implementation**

This directory contains the autonomous AI system that powers intelligent interactions with the LUXBIN blockchain ecosystem.

## 🚀 Features

- **Codebase Indexing**: Automatic indexing of all LUXBIN source code (Rust, Python, Solidity, TypeScript, docs)
- **Semantic Search**: AI-powered search through the entire codebase using embeddings
- **Contextual Responses**: Responses based on actual implementation details, not just general knowledge
- **Memory System**: Remembers conversation context and user preferences
- **Multi-Modal Support**: Handles code, documentation, configuration files, and more

## 📋 Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Index the Codebase
```bash
python document_indexer.py
```
This will:
- Scan all supported files in the LUXBIN repository
- Create text chunks with overlapping content
- Generate embeddings using Sentence Transformers
- Store everything in ChromaDB for fast retrieval

### 3. Test the Search System
```bash
python rag_search.py "quantum cryptography implementation"
```

### 4. Run the Chatbot
```bash
# Interactive mode
python rag_chatbot.py --interactive

# Test mode
python rag_chatbot.py
```

## 🔧 Components

### `document_indexer.py`
- Indexes all LUXBIN files (Rust, Python, Solidity, TypeScript, docs)
- Supports PDF, Word, HTML extraction
- Creates overlapping text chunks for better retrieval
- Uses ChromaDB for persistent vector storage

### `rag_search.py`
- Semantic search interface
- Explains code features with real examples
- Returns formatted results with relevance scores

### `rag_chatbot.py`
- Interactive AI assistant with RAG capabilities
- Remembers conversation context
- Provides code explanations from actual implementation
- Supports different query types (code, explanation, implementation)

## 🎯 Usage Examples

### Code Questions
```
You: How does the temporal key generation work?

🤖 Luxbin AI: Based on the LUXBIN codebase, here's how temporal key generation works:

From quantum-ai/QuantumGameDevAI/quantum_protocols.py:
```python
def generate_temporal_key(quantum_state, time_window):
    # Implementation details from actual code...
```

🔍 Searched 3 relevant code sections
```

### Implementation Questions
```
You: How do I deploy a smart contract?

🤖 Luxbin AI: Here's how to implement that in the LUXBIN system:

Configuration (contracts/hardhat.config.js):
```javascript
// Actual config from codebase...
```

Implementation Example (contracts/LuxbinToken.sol):
```solidity
// Real contract code...
```
```

### General Questions
```
You: What is the immune system?

🤖 Luxbin AI: Based on the LUXBIN codebase, here's what I found:

The immune system provides real-time threat detection using quantum algorithms...

This information comes from `luxbin_immune_system.py`.
```

## 🏗️ Architecture

```
User Query
    ↓
Search Codebase (ChromaDB)
    ↓
Retrieve Relevant Code Chunks
    ↓
Generate Contextual Response
    ↓
Update Conversation Memory
```

## 🔍 Search Capabilities

- **Multi-language support**: Rust, Python, Solidity, TypeScript, JavaScript
- **Document types**: Code, markdown, JSON, TOML, PDF, HTML
- **Semantic matching**: Uses embeddings for meaning-based search
- **Chunking strategy**: Overlapping text chunks for context preservation
- **Metadata tracking**: File paths, languages, modification times

## 💾 Data Storage

- **ChromaDB**: Local vector database (no API keys required)
- **Embeddings**: Sentence Transformers (all-MiniLM-L6-v2)
- **Index size**: ~500MB for full LUXBIN codebase
- **Query speed**: Sub-second semantic search

## 🚀 Future Phases

This is Phase 1 of the autonomous AI roadmap:

- **Phase 2**: Function Calling (autonomous blockchain operations)
- **Phase 3**: Memory System (persistent user profiles)
- **Phase 4**: Autonomous Agents (proactive monitoring)
- **Phase 5**: Multi-Agent System (specialized AI collaborators)

## 🔧 Configuration

Edit the following files to customize:

- `document_indexer.py`: Modify file extensions, chunk sizes, embedding models
- `rag_chatbot.py`: Adjust response formatting, memory limits, search parameters
- `requirements.txt`: Update dependencies

## 📊 Monitoring

Check system stats:
```python
from rag_search import get_luxbin_stats
stats = get_luxbin_stats()
print(f"Indexed {stats['total_chunks_indexed']} chunks")
```

## 🤝 Contributing

The autonomous AI system learns from the LUXBIN codebase. To improve responses:

1. Add comprehensive documentation
2. Include code comments explaining complex logic
3. Update the indexer when adding new file types
4. Test with diverse query types

---

**Built for the future of blockchain intelligence** ⚡🔮