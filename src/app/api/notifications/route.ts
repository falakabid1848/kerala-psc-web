import { NextRequest, NextResponse } from 'next/server';
import { getNotifications } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const featured = searchParams.get('featured');

  let list = getNotifications();

  if (status && status !== 'all') {
    list = list.filter((n) => n.status === status);
  }

  if (featured === 'true') {
    list = list.filter((n) => n.is_featured);
  }

  return NextResponse.json(list);
}
