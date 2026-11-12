'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  FileText, 
  PlayCircle, 
  Printer, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Award, 
  Calendar, 
  Share2, 
  Check, 
  BookOpen, 
  Sparkles,
  Layers,
  Eye,
  EyeOff
} from 'lucide-react';
import { PreviousPaper, Question } from '@/types';

function PaperViewerContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const paperId = (params?.id as string) || '';
  const initialView = searchParams.get('view') === 'key' ? 'key' : 'paper';

  const [paper, setPaper] = useState<PreviousPaper | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'paper' | 'key'>(initialView);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [revealAll, setRevealAll] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!paperId) return;

    async function loadData() {
      try {
        const [paperRes, questionsRes] = await Promise.all([
          fetch(`/api/previous-papers?id=${encodeURIComponent(paperId)}`),
          fetch(`/api/questions?paper_id=${encodeURIComponent(paperId)}&limit=100&random=false`)
        ]);

        if (paperRes.ok) {
          const paperData = await paperRes.json();
          setPaper(paperData);
        }

        if (questionsRes.ok) {
          const qData = await questionsRes.json();
          // The API might return { questions: [...] } or flat array
          const list = Array.isArray(qData) ? qData : (qData.questions || []);
          list.sort((a: Question, b: Question) => (a.paper_qno || 0) - (b.paper_qno || 0));
          setQuestions(list);
        }
      } catch (err) {
        console.error('Failed to load paper details:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [paperId]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const toggleRevealSingle = (qId: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-500 text-sm font-medium">Loading authentic question paper & answer key...</p>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4">
        <FileText className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Question Paper Not Found</h2>
        <p className="text-sm text-slate-500">The requested previous year paper could not be loaded.</p>
        <Link
          href="/previous-papers"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Previous Papers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Navigation & Breadcrumbs (Hidden when printing) */}
      <div className="flex items-center justify-between gap-3 print:hidden">
        <Link
          href="/previous-papers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Previous Papers</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print / Save PDF</span>
            <span className="sm:hidden">Print</span>
          </button>
        </div>
      </div>

      {/* Official Paper Header / Hero Box */}
      <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-md tracking-wider">
              CODE: {paper.question_code}
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md">
              {paper.category}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">
              Year {paper.year}
            </span>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Kerala Public Service Commission Official Paper
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 leading-snug">
          {paper.exam_name}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          {paper.description}
        </p>

        {/* Exam Parameters Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 mb-5">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Total Questions</span>
            <span className="font-bold text-white text-sm">{questions.length || paper.total_questions} Questions</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Duration</span>
            <span className="font-bold text-white text-sm">{paper.duration_minutes} Minutes</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Marking Scheme</span>
            <span className="font-bold text-amber-400 text-sm">+1.0 / -0.33 Mark</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Official Cut-Off</span>
            <span className="font-bold text-emerald-400 text-sm">{paper.cut_off || '58.00 Marks'}</span>
          </div>
        </div>

        {/* Primary CTA Button (Hidden when printing) */}
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <Link
            href={`/quiz?paper_id=${paper.id}&mode=exam`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition transform active:scale-98"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Launch Live Mock Test ({paper.duration_minutes}m Exam Mode)</span>
          </Link>
        </div>
      </div>

      {/* View Switcher Tabs (Hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs print:hidden">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('paper')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'paper'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Question Paper Layout</span>
          </button>

          <button
            onClick={() => setActiveTab('key')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'key'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Answer Key & Explanations</span>
          </button>
        </div>

        {activeTab === 'paper' && (
          <button
            onClick={() => setRevealAll(!revealAll)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ml-auto"
          >
            {revealAll ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{revealAll ? 'Hide All Answers' : 'Reveal All Answers'}</span>
          </button>
        )}
      </div>

      {/* Answer Key Quick Matrix (Shown only on Answer Key Tab) */}
      {activeTab === 'key' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs print:hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Quick Answer Key Matrix (Questions 1 to {questions.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">OMR Reference</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-20 gap-1.5 text-center font-mono">
            {questions.map((q, idx) => (
              <div 
                key={q.id} 
                className="bg-emerald-50 border border-emerald-200/80 rounded-lg py-1 px-0.5 text-xs"
              >
                <div className="text-[10px] text-emerald-700 font-semibold">{idx + 1}</div>
                <div className="font-extrabold text-emerald-950">{q.correct_option}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Printable Paper Header (Visible only when printing) */}
      <div className="hidden print:block text-center border-b pb-4 mb-4">
        <h2 className="text-lg font-black uppercase">Kerala Public Service Commission</h2>
        <h3 className="text-base font-bold">{paper.exam_name}</h3>
        <p className="text-xs text-slate-600">
          Question Code: {paper.question_code} | Total Questions: {questions.length} | Time: {paper.duration_minutes} Minutes | Max Marks: 100
        </p>
      </div>

      {/* Questions Stream */}
      <div className="space-y-4">
        {questions.map((q, index) => {
          const qNum = q.paper_qno || index + 1;
          const isRevealed = revealAll || revealedAnswers[q.id] || activeTab === 'key';

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs hover:border-slate-300 transition"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0">
                    {qNum}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {q.category}
                    </span>
                    {q.sub_category && (
                      <span className="text-[10px] text-slate-500 font-medium ml-1.5 hidden sm:inline">
                        • {q.sub_category}
                      </span>
                    )}
                  </div>
                </div>

                {activeTab === 'paper' && (
                  <button
                    onClick={() => toggleRevealSingle(q.id)}
                    className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-slate-50 transition print:hidden"
                  >
                    {isRevealed ? 'Hide Answer' : 'Show Answer'}
                  </button>
                )}
              </div>

              {/* Question Text */}
              <div className="text-slate-900 text-sm sm:text-base font-semibold leading-relaxed mb-3 whitespace-pre-line pl-1 sm:pl-2">
                {q.question_text}
              </div>

              {/* Statements (if multi-statement question) */}
              {q.statements && q.statements.length > 0 && (
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/80 space-y-1.5 mb-3.5 text-xs sm:text-sm text-slate-700 font-medium">
                  {q.statements.map((st, i) => (
                    <div key={i} className="leading-snug">{st}</div>
                  ))}
                </div>
              )}

              {/* 4 Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {q.options.map((opt) => {
                  const isCorrect = isRevealed && opt.id === q.correct_option;

                  return (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-2.5 transition ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold ring-1 ring-emerald-300'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Answer & Explanation Box */}
              {isRevealed && (
                <div className="mt-3 bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm text-emerald-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Answer: Option {q.correct_option}</span>
                  </div>
                  <div className="text-slate-700 text-xs leading-relaxed font-normal">
                    <span className="font-semibold text-slate-900 mr-1">Explanation:</span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Test Mode CTA (Hidden when printing) */}
      <div className="sticky bottom-4 z-20 bg-slate-900/95 backdrop-blur text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <div className="text-xs font-bold text-white">Ready to test yourself under real exam conditions?</div>
          <div className="text-[11px] text-slate-300">
            100 Questions • 75 Minutes • Official OMR Sheet • -0.33 Negative Deduction
          </div>
        </div>

        <Link
          href={`/quiz?paper_id=${paper.id}&mode=exam`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition transform active:scale-98"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Start Timed Mock Test</span>
        </Link>
      </div>
    </div>
  );
}

export default function PaperViewerPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PaperViewerContent />
    </Suspense>
  );
}
