import { NextRequest, NextResponse } from 'next/server';
import { getAttempts, saveAttempt } from '@/lib/db';

export async function GET() {
  const attempts = getAttempts();
  return NextResponse.json(attempts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userName, yearFilter, categoryFilter, subCategoryFilter, totalQuestions, score, percentage, timeTakenSeconds, answers } = body;

    const saved = saveAttempt({
      userName: userName || 'Aspirant',
      yearFilter: yearFilter || 'All',
      categoryFilter: categoryFilter || 'All',
      subCategoryFilter: subCategoryFilter || 'All',
      totalQuestions: totalQuestions || 0,
      score: score || 0,
      percentage: percentage || 0,
      timeTakenSeconds: timeTakenSeconds || 0,
      answers: answers || {},
    });

    return NextResponse.json({ success: true, attempt: saved });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to record attempt', details: err.message }, { status: 500 });
  }
}
