import { NextResponse } from 'next/server';
import dictionaryData from '../../../lib/light-language-dictionary.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: dictionaryData,
      count: dictionaryData.length,
      message: 'Light Language dictionary retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve dictionary',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint for adding new entries (if needed in future)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.symbol || !body.meaning) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: symbol and meaning'
        },
        { status: 400 }
      );
    }

    // In a real app, you'd save to a database
    // For now, just return success (data persists in memory only)
    const newEntry = {
      symbol: body.symbol,
      meaning: body.meaning,
      category: body.category || 'General'
    };

    return NextResponse.json({
      success: true,
      data: newEntry,
      message: 'Dictionary entry added successfully (note: changes are not persisted)'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add dictionary entry',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}