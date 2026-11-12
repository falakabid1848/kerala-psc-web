import { NextRequest, NextResponse } from 'next/server';
import { getPreviousPapers } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const year = searchParams.get('year');

  const list = getPreviousPapers();

  if (id) {
    const paper = list.find((p) => p.id === id || p.question_code === id);
    if (!paper) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }
    return NextResponse.json(paper);
  }

  let filtered = list;

  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (year && year !== 'All') {
    const y = parseInt(year, 10);
    if (!isNaN(y)) {
      filtered = filtered.filter((p) => p.year === y);
    }
  }

  return NextResponse.json(filtered);
}
