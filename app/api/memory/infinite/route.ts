import { NextRequest, NextResponse } from 'next/server';
import { infiniteMemory } from '@/lib/infiniteMemory';

/**
 * Infinite Memory API
 * Store and retrieve EVERYTHING the AI has ever experienced
 * Provides continuous memory across chat sessions
 */

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();

    switch (action) {
      case 'store_conversation':
        const convMemory = await infiniteMemory.storeConversation(
          data.role,
          data.content,
          data.metadata
        );
        return NextResponse.json({
          success: true,
          memory: convMemory,
          totalMemories: infiniteMemory.getMemoryCount()
        });

      case 'store_learning':
        const learnMemory = await infiniteMemory.storeLearning(
          data.topic,
          data.insights,
          data.category,
          data.photonicCode
        );
        return NextResponse.json({
          success: true,
          memory: learnMemory,
          totalMemories: infiniteMemory.getMemoryCount()
        });

      case 'store_thought':
        const thoughtMemory = await infiniteMemory.storeThought(
          data.content,
          data.category
        );
        return NextResponse.json({
          success: true,
          memory: thoughtMemory,
          totalMemories: infiniteMemory.getMemoryCount()
        });

      case 'search':
        const results = await infiniteMemory.searchMemories(
          data.query,
          data.limit || 50
        );
        return NextResponse.json({
          query: data.query,
          results,
          count: results.length
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Infinite memory error:', error);
    return NextResponse.json(
      { error: 'Memory operation failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'index') {
      const index = await infiniteMemory.getIndex();
      return NextResponse.json(index);
    }

    if (action === 'context') {
      const limit = parseInt(searchParams.get('limit') || '100');
      const context = await infiniteMemory.getRecentContext(limit);
      return NextResponse.json({
        context,
        totalMemories: infiniteMemory.getMemoryCount()
      });
    }

    if (action === 'get') {
      const id = searchParams.get('id');
      if (!id) {
        return NextResponse.json({ error: 'Memory ID required' }, { status: 400 });
      }
      const memory = await infiniteMemory.getMemory(id);
      return NextResponse.json(memory || { error: 'Memory not found' });
    }

    // Default: Get all memories with filters
    const type = searchParams.get('type') as any;
    const category = searchParams.get('category') || undefined;
    const limit = parseInt(searchParams.get('limit') || '100');
    const since = searchParams.get('since') ? parseInt(searchParams.get('since')!) : undefined;
    const minImportance = searchParams.get('importance') ? parseInt(searchParams.get('importance')!) : undefined;

    const memories = await infiniteMemory.getAllMemories({
      type,
      category,
      limit,
      since,
      minImportance
    });

    return NextResponse.json({
      memories,
      count: memories.length,
      total: infiniteMemory.getMemoryCount()
    });

  } catch (error) {
    console.error('Memory retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve memories' },
      { status: 500 }
    );
  }
}
