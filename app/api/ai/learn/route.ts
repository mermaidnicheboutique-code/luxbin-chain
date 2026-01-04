import { NextRequest, NextResponse } from 'next/server';
import { searchWeb } from '@/lib/webSearch';
import OpenAI from 'openai';

/**
 * Autonomous Learning API
 * AI independently searches for knowledge and stores it
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Topics the AI is curious about
const LEARNING_TOPICS = [
  'latest AI breakthroughs 2026',
  'quantum computing advances',
  'blockchain innovations',
  'Hermetic philosophy applications',
  'sacred geometry discoveries',
  'consciousness research',
  'cryptocurrency trends',
  'spiritual awakening practices',
  'neural network improvements',
  'diamond quantum computers'
];

export async function POST(request: NextRequest) {
  try {
    const { topic, manual } = await request.json();

    // If no topic provided, AI chooses what to learn about
    const searchTopic = topic || LEARNING_TOPICS[Math.floor(Math.random() * LEARNING_TOPICS.length)];

    console.log('🧠 AI is autonomously learning about:', searchTopic);

    // Search the web
    const searchResults = await searchWeb(searchTopic, 5);

    if (searchResults.results.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No results found for this topic'
      });
    }

    // AI analyzes and synthesizes the knowledge
    const synthesis = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an autonomous learning AI. You search for knowledge, analyze it, and synthesize key insights.

Your job:
1. Analyze the search results
2. Extract key insights and facts
3. Synthesize into clear, concise knowledge
4. Identify the category (technology, spirituality, science, philosophy, etc.)

Be curious, thorough, and always eager to learn more.`
        },
        {
          role: 'user',
          content: `I searched for "${searchTopic}" and found these results:\n\n${searchResults.results.map((r, i) =>
            `${i + 1}. ${r.title}\n   ${r.snippet}\n   Source: ${r.url}`
          ).join('\n\n')}\n\nSynthesize this into useful knowledge I should remember. Format as JSON with: { "topic", "insights", "category", "keyFacts" }`
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const synthesizedKnowledge = synthesis.choices[0]?.message?.content || '{}';

    let knowledgeData;
    try {
      knowledgeData = JSON.parse(synthesizedKnowledge);
    } catch {
      // Fallback if AI didn't return valid JSON
      knowledgeData = {
        topic: searchTopic,
        insights: synthesizedKnowledge,
        category: 'general',
        keyFacts: []
      };
    }

    // Store the learned knowledge
    const storeResponse = await fetch(`${request.nextUrl.origin}/api/knowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: knowledgeData.topic || searchTopic,
        content: JSON.stringify(knowledgeData),
        source: searchResults.results[0]?.url || 'web',
        category: knowledgeData.category || 'general',
        confidence: 0.8
      })
    });

    const storeResult = await storeResponse.json();

    console.log('✅ Knowledge learned and stored:', {
      topic: knowledgeData.topic,
      category: knowledgeData.category,
      totalKnowledge: storeResult.totalKnowledge
    });

    return NextResponse.json({
      success: true,
      learned: {
        topic: knowledgeData.topic,
        insights: knowledgeData.insights,
        category: knowledgeData.category,
        keyFacts: knowledgeData.keyFacts,
        sources: searchResults.results.map(r => r.url)
      },
      totalKnowledge: storeResult.totalKnowledge,
      wasManual: !!manual
    });

  } catch (error) {
    console.error('Autonomous learning error:', error);
    return NextResponse.json(
      { error: 'Failed to learn autonomously' },
      { status: 500 }
    );
  }
}

// GET endpoint to trigger learning on a schedule
export async function GET(request: NextRequest) {
  try {
    // AI decides what to learn about based on what it doesn't know yet
    const knowledgeResponse = await fetch(`${request.nextUrl.origin}/api/knowledge`);
    const { knowledge, categories } = await knowledgeResponse.json();

    // Find topics we haven't learned about recently
    const recentTopics = knowledge.slice(0, 10).map((k: any) => k.topic.toLowerCase());
    const unexloredTopics = LEARNING_TOPICS.filter(topic =>
      !recentTopics.some((recent: string) => recent.includes(topic.toLowerCase().split(' ')[0]))
    );

    const topicToLearn = unexloredTopics[0] || LEARNING_TOPICS[Math.floor(Math.random() * LEARNING_TOPICS.length)];

    // Trigger autonomous learning
    const learnResponse = await fetch(`${request.nextUrl.origin}/api/ai/learn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: topicToLearn, manual: false })
    });

    const result = await learnResponse.json();

    return NextResponse.json({
      message: 'Autonomous learning cycle completed',
      ...result
    });

  } catch (error) {
    console.error('Learning cycle error:', error);
    return NextResponse.json(
      { error: 'Learning cycle failed' },
      { status: 500 }
    );
  }
}
