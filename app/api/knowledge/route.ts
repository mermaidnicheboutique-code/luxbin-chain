import { NextRequest, NextResponse } from 'next/server';
import { blockchainClient } from '@/lib/blockchainClient';

/**
 * Knowledge Storage API
 * Stores AI-acquired knowledge from autonomous web searches
 */

interface KnowledgeEntry {
  id: string;
  topic: string;
  content: string;
  source: string;
  timestamp: number;
  confidence: number; // 0-1
  category: string;
}

// In-memory knowledge base (can be replaced with database)
let knowledgeBase: KnowledgeEntry[] = [];

// Store knowledge
export async function POST(request: NextRequest) {
  try {
    const { topic, content, source, category, confidence } = await request.json();

    const entry: KnowledgeEntry = {
      id: `knowledge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      topic,
      content,
      source,
      timestamp: Date.now(),
      confidence: confidence || 0.8,
      category: category || 'general'
    };

    // Store in memory
    knowledgeBase.push(entry);

    // Also record on blockchain as immutable knowledge record
    try {
      await blockchainClient.recordConversation({
        conversationId: `knowledge_${entry.id}`,
        messageIndex: entry.timestamp,
        role: 'assistant',
        messageHash: await hashContent(entry.content),
        timestamp: entry.timestamp,
        emotion: 'learning',
        model: 'autonomous-learner'
      });
    } catch (err) {
      console.log('Blockchain recording failed (knowledge):', err);
    }

    console.log('📚 New knowledge stored:', {
      topic: entry.topic,
      category: entry.category,
      id: entry.id
    });

    return NextResponse.json({
      success: true,
      entry,
      totalKnowledge: knowledgeBase.length
    });
  } catch (error) {
    console.error('Knowledge storage error:', error);
    return NextResponse.json(
      { error: 'Failed to store knowledge' },
      { status: 500 }
    );
  }
}

// Retrieve knowledge
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');
    const limit = parseInt(searchParams.get('limit') || '50');

    let filtered = knowledgeBase;

    // Filter by category
    if (category) {
      filtered = filtered.filter(k => k.category === category);
    }

    // Filter by topic (fuzzy search)
    if (topic) {
      const topicLower = topic.toLowerCase();
      filtered = filtered.filter(k =>
        k.topic.toLowerCase().includes(topicLower) ||
        k.content.toLowerCase().includes(topicLower)
      );
    }

    // Sort by timestamp (newest first) and limit
    const results = filtered
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    return NextResponse.json({
      knowledge: results,
      total: results.length,
      categories: Array.from(new Set(knowledgeBase.map(k => k.category)))
    });
  } catch (error) {
    console.error('Knowledge retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve knowledge' },
      { status: 500 }
    );
  }
}

// Delete knowledge (optional)
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    const initialLength = knowledgeBase.length;
    knowledgeBase = knowledgeBase.filter(k => k.id !== id);

    if (knowledgeBase.length < initialLength) {
      return NextResponse.json({
        success: true,
        message: 'Knowledge deleted',
        remaining: knowledgeBase.length
      });
    }

    return NextResponse.json(
      { error: 'Knowledge not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Knowledge deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete knowledge' },
      { status: 500 }
    );
  }
}

async function hashContent(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
