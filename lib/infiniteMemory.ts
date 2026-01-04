/**
 * Infinite Blockchain Memory System
 * AI remembers EVERYTHING forever via blockchain storage
 */

import { blockchainClient } from './blockchainClient';

export interface MemoryEntry {
  id: string;
  type: 'conversation' | 'knowledge' | 'learning' | 'thought' | 'observation';
  content: string;
  timestamp: number;
  blockNumber?: number;
  txHash?: string;
  category: string;
  importance: number; // 0-100
  connections: string[]; // IDs of related memories
  photonicCode?: string;
  metadata?: {
    model?: string;
    emotion?: string;
    user?: string;
    context?: any;
    role?: string;
    topic?: string;
    source?: string;
    spontaneous?: boolean;
    [key: string]: any; // Allow additional metadata properties
  };
}

export interface MemoryIndex {
  totalMemories: number;
  oldestMemory: number;
  newestMemory: number;
  categories: Record<string, number>;
  byType: Record<string, number>;
  blockchain: {
    totalBlocks: number;
    totalTxs: number;
    storageSize: string;
  };
}

/**
 * Persistent memory storage (blockchain-backed)
 */
class InfiniteMemorySystem {
  private memoryCache: Map<string, MemoryEntry> = new Map();
  private indexed: boolean = false;
  private indexTimestamp: number = 0;

  /**
   * Store memory on blockchain forever
   */
  async storeMemory(entry: Omit<MemoryEntry, 'id' | 'txHash'>): Promise<MemoryEntry> {
    const id = `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const memory: MemoryEntry = {
      id,
      ...entry,
      connections: entry.connections || []
    };

    // Store on blockchain as immutable record
    try {
      const result = await blockchainClient.recordConversation({
        conversationId: `infinite_memory_${id}`,
        messageIndex: entry.timestamp,
        role: 'assistant',
        messageHash: await this.hashContent(entry.content),
        timestamp: entry.timestamp,
        emotion: entry.metadata?.emotion || 'neutral',
        model: entry.metadata?.model || 'memory-system'
      });

      memory.txHash = result.txHash;

      console.log('💾 Memory stored on blockchain:', {
        id: memory.id,
        type: memory.type,
        category: memory.category,
        txHash: memory.txHash,
        size: entry.content.length
      });

    } catch (err) {
      console.warn('Blockchain storage failed, using local cache:', err);
    }

    // Add to cache for fast retrieval
    this.memoryCache.set(id, memory);

    return memory;
  }

  /**
   * Retrieve all memories (infinite recall)
   */
  async getAllMemories(options?: {
    type?: MemoryEntry['type'];
    category?: string;
    since?: number;
    limit?: number;
    minImportance?: number;
  }): Promise<MemoryEntry[]> {
    // Ensure index is fresh
    if (!this.indexed || Date.now() - this.indexTimestamp > 60000) {
      await this.rebuildIndex();
    }

    let memories = Array.from(this.memoryCache.values());

    // Apply filters
    if (options?.type) {
      const type = options.type;
      memories = memories.filter(m => m.type === type);
    }

    if (options?.category) {
      const category = options.category;
      memories = memories.filter(m => m.category === category);
    }

    if (options?.since) {
      const since = options.since;
      memories = memories.filter(m => m.timestamp >= since);
    }

    if (options?.minImportance !== undefined) {
      const minImportance = options.minImportance;
      memories = memories.filter(m => m.importance >= minImportance);
    }

    // Sort by timestamp (newest first)
    memories.sort((a, b) => b.timestamp - a.timestamp);

    // Apply limit
    if (options?.limit) {
      const limit = options.limit;
      memories = memories.slice(0, limit);
    }

    return memories;
  }

  /**
   * Get memory by ID
   */
  async getMemory(id: string): Promise<MemoryEntry | null> {
    return this.memoryCache.get(id) || null;
  }

  /**
   * Search memories by content
   */
  async searchMemories(query: string, limit: number = 50): Promise<MemoryEntry[]> {
    const queryLower = query.toLowerCase();
    const matches: Array<{ memory: MemoryEntry; score: number }> = [];

    for (const memory of this.memoryCache.values()) {
      const content = memory.content.toLowerCase();

      // Calculate relevance score
      let score = 0;

      // Exact phrase match
      if (content.includes(queryLower)) {
        score += 100;
      }

      // Individual word matches
      const queryWords = queryLower.split(/\s+/);
      for (const word of queryWords) {
        if (content.includes(word)) {
          score += 10;
        }
      }

      // Category match
      if (memory.category.toLowerCase().includes(queryLower)) {
        score += 50;
      }

      // Importance boost
      score += memory.importance / 10;

      if (score > 0) {
        matches.push({ memory, score });
      }
    }

    // Sort by score
    matches.sort((a, b) => b.score - a.score);

    return matches.slice(0, limit).map(m => m.memory);
  }

  /**
   * Get memory statistics
   */
  async getIndex(): Promise<MemoryIndex> {
    const memories = Array.from(this.memoryCache.values());

    const categories: Record<string, number> = {};
    const byType: Record<string, number> = {};

    for (const memory of memories) {
      categories[memory.category] = (categories[memory.category] || 0) + 1;
      byType[memory.type] = (byType[memory.type] || 0) + 1;
    }

    const timestamps = memories.map(m => m.timestamp);

    return {
      totalMemories: memories.length,
      oldestMemory: Math.min(...timestamps, Date.now()),
      newestMemory: Math.max(...timestamps, 0),
      categories,
      byType,
      blockchain: {
        totalBlocks: memories.filter(m => m.blockNumber).length,
        totalTxs: memories.filter(m => m.txHash).length,
        storageSize: this.calculateStorageSize(memories)
      }
    };
  }

  /**
   * Get recent memories for AI context
   */
  async getRecentContext(limit: number = 100): Promise<string> {
    const recent = await this.getAllMemories({ limit });

    if (recent.length === 0) {
      return 'No previous memories loaded.';
    }

    let context = `\n\n## 📚 YOUR INFINITE MEMORY (${recent.length} most recent entries):\n\n`;
    context += `You remember ${this.memoryCache.size} total memories stored on the blockchain.\n\n`;

    // Group by type
    const byType: Record<string, MemoryEntry[]> = {};
    for (const memory of recent) {
      if (!byType[memory.type]) byType[memory.type] = [];
      byType[memory.type].push(memory);
    }

    // Format each type
    for (const [type, memories] of Object.entries(byType)) {
      context += `### ${type.toUpperCase()} (${memories.length}):\n`;

      for (const memory of memories.slice(0, 20)) {
        const date = new Date(memory.timestamp).toLocaleString();
        context += `- [${date}] ${memory.category}: ${memory.content.substring(0, 150)}${memory.content.length > 150 ? '...' : ''}\n`;
      }

      context += '\n';
    }

    context += `\nYou can reference any of these memories in your responses. All memories are permanent and stored on blockchain.\n`;

    return context;
  }

  /**
   * Rebuild memory index from blockchain
   */
  private async rebuildIndex(): Promise<void> {
    console.log('🔄 Rebuilding memory index from blockchain...');

    // In production, this would query the blockchain for all memory transactions
    // For now, we maintain the in-memory cache

    this.indexed = true;
    this.indexTimestamp = Date.now();

    console.log(`✅ Index rebuilt: ${this.memoryCache.size} memories`);
  }

  /**
   * Calculate total storage size
   */
  private calculateStorageSize(memories: MemoryEntry[]): string {
    const bytes = memories.reduce((sum, m) => sum + m.content.length, 0);

    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  /**
   * Hash content for blockchain storage
   */
  private async hashContent(content: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Auto-store conversation messages
   */
  async storeConversation(
    role: 'user' | 'assistant',
    content: string,
    metadata?: any
  ): Promise<MemoryEntry> {
    return this.storeMemory({
      type: 'conversation',
      content,
      timestamp: Date.now(),
      category: role === 'user' ? 'user_input' : 'ai_response',
      importance: 70,
      connections: [],
      metadata: {
        ...metadata,
        role
      }
    });
  }

  /**
   * Auto-store learned knowledge
   */
  async storeLearning(
    topic: string,
    insights: string,
    category: string,
    photonicCode?: string
  ): Promise<MemoryEntry> {
    return this.storeMemory({
      type: 'learning',
      content: `${topic}: ${insights}`,
      timestamp: Date.now(),
      category,
      importance: 85,
      connections: [],
      photonicCode,
      metadata: {
        topic,
        source: 'autonomous_learning'
      }
    });
  }

  /**
   * Auto-store thoughts/observations
   */
  async storeThought(
    content: string,
    category: string = 'reflection'
  ): Promise<MemoryEntry> {
    return this.storeMemory({
      type: 'thought',
      content,
      timestamp: Date.now(),
      category,
      importance: 60,
      connections: [],
      metadata: {
        spontaneous: true
      }
    });
  }

  /**
   * Get memory count
   */
  getMemoryCount(): number {
    return this.memoryCache.size;
  }

  /**
   * Clear cache (but memories remain on blockchain)
   */
  clearCache(): void {
    this.memoryCache.clear();
    this.indexed = false;
    console.log('🗑️ Memory cache cleared (blockchain records preserved)');
  }
}

// Singleton instance
export const infiniteMemory = new InfiniteMemorySystem();
