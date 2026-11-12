import { NextRequest, NextResponse } from 'next/server';
import { getReports, saveReport, updateReportStatus, updateQuestionAnswer } from '@/lib/db';

export async function GET() {
  const reports = getReports();
  return NextResponse.json(reports);
}

export async function POST(request: NextRequest) {
  try {
    const { questionId, questionText, reason, details } = await request.json();

    if (!questionId || !reason) {
      return NextResponse.json(
        { error: 'Question ID and report reason are required.' },
        { status: 400 }
      );
    }

    const saved = saveReport({
      questionId,
      questionText: questionText || 'Kerala PSC Question',
      reason,
      details: details || '',
    });

    return NextResponse.json({ success: true, report: saved });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to record report', details: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { reportId, status, newCorrectOption, questionId } = await request.json();

    if (!reportId || !status) {
      return NextResponse.json(
        { error: 'Report ID and status are required.' },
        { status: 400 }
      );
    }

    // If admin is also fixing the answer key
    if (newCorrectOption && questionId) {
      updateQuestionAnswer(questionId, newCorrectOption);
    }

    const ok = updateReportStatus(reportId, status);
    if (!ok) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update report', details: err.message }, { status: 500 });
  }
}
