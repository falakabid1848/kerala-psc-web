import { NextRequest, NextResponse } from 'next/server';
import { getBookmarks, toggleBookmark } from '@/lib/db';
import { getQuestions } from '@/lib/data';

export async function GET() {
  const bookmarkIds = getBookmarks();
  const allQuestions = getQuestions();
  const bookmarkedQuestions = allQuestions.filter((q) => bookmarkIds.includes(q.id));
  return NextResponse.json({ bookmarkIds, questions: bookmarkedQuestions });
}

export async function POST(request: NextRequest) {
  try {
    const { questionId } = await request.json();
    if (!questionId) {
      return NextResponse.json({ error: 'Missing questionId' }, { status: 400 });
    }
    const result = toggleBookmark(questionId);
    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update bookmark', details: err.message }, { status: 500 });
  }
}
