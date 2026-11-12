import { NextRequest, NextResponse } from 'next/server';
import { getQuestions, saveQuestions, queryQuestions, getQuestionBankStats } from '@/lib/data';
import { Question } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode');

  if (mode === 'stats') {
    const stats = getQuestionBankStats();
    return NextResponse.json(stats);
  }

  const category = searchParams.get('category');
  const subCategory = searchParams.get('sub_category');
  const year = searchParams.get('year');
  const language = searchParams.get('language');
  const questionType = searchParams.get('type');
  const search = searchParams.get('search');
  const difficulty = searchParams.get('difficulty');
  const exam = searchParams.get('exam');
  const paper_id = searchParams.get('paper_id') || searchParams.get('paper');
  const status = searchParams.get('status') || 'approved';

  const page = parseInt(searchParams.get('page') || '1', 10);
  const defaultLimit = paper_id ? '100' : '20';
  const limit = parseInt(searchParams.get('limit') || defaultLimit, 10);
  const random = searchParams.get('random') === 'true';
  const format = searchParams.get('format'); // 'flat' or default paginated object

  const filters = {
    category,
    subCategory,
    year,
    language,
    type: questionType,
    search,
    difficulty,
    exam,
    paper_id,
    status
  };

  const result = queryQuestions(filters, page, limit, random);

  // If client expects flat array (e.g. for simple quiz fetching)
  if (format === 'flat' || mode === 'quiz') {
    return NextResponse.json(result.questions);
  }

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const newQuestion: Question = await request.json();
    if (!newQuestion.question_text || !newQuestion.options || newQuestion.options.length < 2) {
      return NextResponse.json(
        { error: 'Invalid question format: missing question text or options.' },
        { status: 400 }
      );
    }

    const questions = getQuestions();
    const existingIndex = questions.findIndex((q) => q.id === newQuestion.id);
    if (existingIndex >= 0) {
      questions[existingIndex] = newQuestion;
    } else {
      questions.unshift(newQuestion);
    }

    saveQuestions(questions);
    return NextResponse.json({ success: true, question: newQuestion });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save question' },
      { status: 500 }
    );
  }
}
