import { NextRequest, NextResponse } from 'next/server';
import { queryCurrentAffairs, getCurrentAffairs } from '@/lib/data';
import { Question } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const month = searchParams.get('month');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const yearParam = searchParams.get('year');
  const mode = searchParams.get('mode');

  let year: number | undefined = 2026;
  if (yearParam) {
    if (yearParam.toLowerCase() === 'all') {
      year = undefined;
    } else {
      const parsed = parseInt(yearParam, 10);
      if (!isNaN(parsed)) year = parsed;
    }
  }

  if (id) {
    const all = getCurrentAffairs();
    const item = all.find((e) => e.id === id);
    if (!item) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  }

  const entries = queryCurrentAffairs({
    month,
    category,
    search,
    year
  });

  // If quiz mode is requested, transform each current affair into a standard Question object
  if (mode === 'quiz') {
    const quizQuestions: Question[] = entries.map((entry, idx) => ({
      id: `CA-${entry.year}-${idx + 1}`,
      year: entry.year,
      category: 'Current Affairs & Schemes',
      sub_category: `${entry.category} Affairs ${entry.year}`,
      exam_name: `Kerala PSC ${entry.year} Current Affairs - ${entry.month}`,
      exam_code: `CA/${entry.year}`,
      language: 'en',
      question_type: 'mcq',
      question_text: `[${entry.display_date} • ${entry.category}] ${entry.psc_potential_question.question_text}`,
      options: entry.psc_potential_question.options,
      correct_option: entry.psc_potential_question.correct_option,
      explanation: entry.psc_potential_question.explanation + ` (Context: ${entry.title})`,
      difficulty: 'medium',
      status: 'approved'
    }));
    return NextResponse.json(quizQuestions);
  }

  return NextResponse.json({
    total: entries.length,
    year: year || 'All',
    month: month || 'All',
    entries
  });
}
