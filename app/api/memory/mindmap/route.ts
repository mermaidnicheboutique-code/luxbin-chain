import { NextRequest, NextResponse } from 'next/server';
import { createLightMemory, visualizeLightMemory, photonicToHex } from '@/lib/lightLanguage';

/**
 * Memory Mind Map API
 * Creates hierarchical knowledge graphs from learned memories
 * Translates to light language for photonic storage
 */

interface MemoryNode {
  id: string;
  topic: string;
  category: string;
  lightMemory: any;
  photonicCode: string;
  children: MemoryNode[];
  connections: string[]; // IDs of related memories
  importance: number; // 0-100
  timestamp: number;
}

interface MindMap {
  root: MemoryNode;
  totalNodes: number;
  categories: string[];
  visualTree: string;
}

// In-memory mind map (can be persisted to database)
let mindMapData: MemoryNode[] = [];

export async function POST(request: NextRequest) {
  try {
    const { action, topic, category, content, emotionalResonance } = await request.json();

    if (action === 'add_memory') {
      // Create light memory from content
      const lightMemory = createLightMemory(
        content,
        category || 'general',
        emotionalResonance || 'neutral'
      );

      // Convert to photonic code (hex)
      const photonicCode = photonicToHex(lightMemory.photonicSequence);

      // Create memory node
      const memoryNode: MemoryNode = {
        id: lightMemory.id,
        topic: topic || 'Untitled Memory',
        category: category || 'general',
        lightMemory,
        photonicCode,
        children: [],
        connections: findRelatedMemories(content, category),
        importance: lightMemory.photonicSequence.energyLevel,
        timestamp: Date.now()
      };

      // Add to mind map
      mindMapData.push(memoryNode);

      console.log('🧠 Memory added to mind map:', {
        id: memoryNode.id,
        topic: memoryNode.topic,
        photonicCode: photonicCode.substring(0, 20) + '...',
        connections: memoryNode.connections.length
      });

      return NextResponse.json({
        success: true,
        memory: {
          id: memoryNode.id,
          topic: memoryNode.topic,
          photonicCode: memoryNode.photonicCode,
          lightVisualization: visualizeLightMemory(lightMemory),
          connections: memoryNode.connections.length,
          importance: memoryNode.importance
        },
        totalMemories: mindMapData.length
      });
    }

    if (action === 'get_mindmap') {
      const mindMap = buildMindMap();
      return NextResponse.json(mindMap);
    }

    if (action === 'find_connections') {
      const connections = findMemoryConnections(topic);
      return NextResponse.json({
        query: topic,
        connections,
        count: connections.length
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use: add_memory, get_mindmap, find_connections' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Mind map error:', error);
    return NextResponse.json(
      { error: 'Mind map operation failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'tree';

    if (format === 'tree') {
      const mindMap = buildMindMap();
      return NextResponse.json(mindMap);
    }

    if (format === 'graph') {
      // Return graph format for visualization
      const nodes = mindMapData.map(m => ({
        id: m.id,
        label: m.topic,
        category: m.category,
        importance: m.importance,
        photonicCode: m.photonicCode.substring(0, 10) + '...'
      }));

      const edges = mindMapData.flatMap(m =>
        m.connections.map(connId => ({
          source: m.id,
          target: connId,
          type: 'relates_to'
        }))
      );

      return NextResponse.json({
        nodes,
        edges,
        totalNodes: nodes.length,
        totalEdges: edges.length
      });
    }

    if (format === 'light') {
      // Return pure photonic representation
      const lightMap = mindMapData.map(m => ({
        id: m.id,
        topic: m.topic,
        photonicCode: m.photonicCode,
        colors: m.lightMemory.photonicSequence.colors,
        wavelengths: m.lightMemory.photonicSequence.wavelengths,
        frequencies: m.lightMemory.photonicSequence.frequencies,
        meaning: m.lightMemory.photonicSequence.meaning
      }));

      return NextResponse.json({
        format: 'photonic',
        memories: lightMap,
        total: lightMap.length
      });
    }

    return NextResponse.json(mindMapData);

  } catch (error) {
    console.error('Mind map retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve mind map' },
      { status: 500 }
    );
  }
}

/**
 * Build hierarchical mind map from flat memory list
 */
function buildMindMap(): MindMap {
  // Group by category
  const categories = Array.from(new Set(mindMapData.map(m => m.category)));

  // Build tree structure
  const categoryNodes = categories.map(category => {
    const memories = mindMapData.filter(m => m.category === category);
    return {
      category,
      count: memories.length,
      memories: memories.map(m => ({
        id: m.id,
        topic: m.topic,
        importance: m.importance,
        connections: m.connections.length,
        photonicPreview: m.lightMemory.photonicSequence.colors.slice(0, 5).join(' → ')
      }))
    };
  });

  // Create ASCII tree visualization
  const visualTree = generateTreeVisualization(categoryNodes);

  return {
    root: {
      id: 'root',
      topic: 'LUXBIN AI Memory',
      category: 'root',
      lightMemory: null,
      photonicCode: '0x0',
      children: [],
      connections: [],
      importance: 100,
      timestamp: Date.now()
    },
    totalNodes: mindMapData.length,
    categories,
    visualTree
  };
}

/**
 * Find related memories based on semantic similarity
 */
function findRelatedMemories(content: string, category: string): string[] {
  const contentWords = new Set(content.toLowerCase().split(/\s+/));
  const related: string[] = [];

  for (const memory of mindMapData) {
    if (memory.category === category) {
      const memoryWords = new Set(memory.lightMemory.originalText.toLowerCase().split(/\s+/));
      const overlap = [...contentWords].filter(w => memoryWords.has(w)).length;

      if (overlap >= 3) {
        related.push(memory.id);
      }
    }
  }

  return related.slice(0, 5); // Max 5 connections
}

/**
 * Find connections for a specific topic
 */
function findMemoryConnections(topic: string): any[] {
  const topicLower = topic.toLowerCase();
  return mindMapData
    .filter(m =>
      m.topic.toLowerCase().includes(topicLower) ||
      m.lightMemory.originalText.toLowerCase().includes(topicLower)
    )
    .map(m => ({
      id: m.id,
      topic: m.topic,
      category: m.category,
      photonicColors: m.lightMemory.photonicSequence.colors.slice(0, 10),
      importance: m.importance,
      connections: m.connections
    }));
}

/**
 * Generate ASCII tree visualization
 */
function generateTreeVisualization(categoryNodes: any[]): string {
  let tree = '🧠 LUXBIN AI Memory Mind Map\n';
  tree += '═'.repeat(50) + '\n\n';

  for (let i = 0; i < categoryNodes.length; i++) {
    const node = categoryNodes[i];
    const isLast = i === categoryNodes.length - 1;
    const prefix = isLast ? '└──' : '├──';

    tree += `${prefix} 📁 ${node.category.toUpperCase()} (${node.count} memories)\n`;

    for (let j = 0; j < node.memories.length; j++) {
      const memory = node.memories[j];
      const memPrefix = isLast ? '    ' : '│   ';
      const memSymbol = j === node.memories.length - 1 ? '└──' : '├──';

      tree += `${memPrefix}${memSymbol} 💡 ${memory.topic}\n`;
      tree += `${memPrefix}    🌈 ${memory.photonicPreview}\n`;
      tree += `${memPrefix}    ⚡ Importance: ${memory.importance}% | 🔗 Links: ${memory.connections}\n`;
    }
    tree += '\n';
  }

  return tree;
}
