'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Question } from '@/types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Timer, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  BookCheck,
  Check,
  AlertCircle,
  Bookmark as BookmarkIcon,
  Flag,
  Send,
  X,
  Calculator,
  Layers,
  CircleDot,
  CheckCircle2,
  ListFilter
} from 'lucide-react';

function QuizPlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const yearParam = searchParams.get('year') || 'All';
  const categoryParam = searchParams.get('category') || 'All';
  const subCategoryParam = searchParams.get('sub_category') || 'All';
  const languageParam = searchParams.get('language') || 'all';
  const typeParam = searchParams.get('type') || 'all';
  const paperIdParam = searchParams.get('paper_id') || searchParams.get('paper') || '';
  const paperCodeParam = searchParams.get('paper_code') || '';
  const initialMode = (searchParams.get('mode') as 'practice' | 'exam' | 'banking') || (paperIdParam || paperCodeParam ? 'exam' : 'practice');
  const limitParam = parseInt(searchParams.get('limit') || (paperIdParam || paperCodeParam ? '100' : '25'), 10);

  const [mode, setMode] = useState<'practice' | 'exam' | 'banking'>(initialMode);
  const [mobileTab, setMobileTab] = useState<'question' | 'omr'>('question');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attemptSaved, setAttemptSaved] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');

  // Reporting State
  const [reportingQuestion, setReportingQuestion] = useState<Question | null>(null);
  const [reportReason, setReportReason] = useState('wrong_answer');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [submittingReport, setSubmittingReport] = useState(false);

  // Review Filter in Results
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct' | 'unattempted'>('all');

  useEffect(() => {
    async function init() {
      try {
        const query = new URLSearchParams();
        query.set('mode', 'quiz');

        const isPreviousPaper = Boolean(paperIdParam || paperCodeParam);
        if (isPreviousPaper) {
          query.set('paper_id', paperIdParam || paperCodeParam);
          query.set('limit', String(limitParam));
          query.set('random', 'false');
        } else {
          query.set('random', 'true');
          query.set('limit', String(limitParam));
          if (yearParam !== 'All') query.set('year', yearParam);
          if (categoryParam !== 'All') query.set('category', categoryParam);
          if (subCategoryParam !== 'All') query.set('sub_category', subCategoryParam);
          if (languageParam !== 'all') query.set('language', languageParam);
          if (typeParam !== 'all') query.set('type', typeParam);
        }

        const [qRes, bRes] = await Promise.all([
          fetch(`/api/questions?${query.toString()}`),
          fetch('/api/bookmarks')
        ]);

        const data = await qRes.json();
        const bData = await bRes.json();

        setQuestions(data);
        if (bData.bookmarkIds) setBookmarkedIds(bData.bookmarkIds);

        if (data.length > 0) {
          let testDuration = data.length * (mode === 'banking' ? 36 : 45);
          if (isPreviousPaper) {
            // Standard official PSC paper duration: 75 mins (4500s) or KAS 90 mins (5400s)
            const isKas = (paperIdParam + paperCodeParam).toLowerCase().includes('kas');
            testDuration = isKas ? 5400 : 4500;
          }
          setTimeLeft(testDuration);
          setVisitedQuestions({ [data[0].id]: true });
        }
      } catch (err) {
        console.error('Failed to load quiz questions:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [yearParam, categoryParam, subCategoryParam, languageParam, typeParam, paperIdParam, paperCodeParam, limitParam, mode]);

  const handleCalcClick = (val: string) => {
    if (val === 'C') setCalcDisplay('0');
    else if (val === '=') {
      try {
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcDisplay(String(res));
      } catch (e) {
        setCalcDisplay('Error');
      }
    } else {
      setCalcDisplay((prev) => (prev === '0' || prev === 'Error' ? val : prev + val));
    }
  };

  const handleFinishQuiz = async () => {
    setIsFinished(true);
    if (!attemptSaved && questions.length > 0) {
      setAttemptSaved(true);
      const { netScore } = calculateStats();
      const percentage = Math.max(0, Math.round((netScore / questions.length) * 100));
      try {
        await fetch('/api/attempts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userName: 'Kerala PSC Aspirant',
            yearFilter: yearParam,
            categoryFilter: categoryParam,
            subCategoryFilter: subCategoryParam,
            totalQuestions: questions.length,
            score: netScore,
            percentage,
            timeTakenSeconds: questions.length * 45 - timeLeft,
            answers: selectedAnswers
          })
        });
      } catch (err) {
        console.error('Failed to record attempt:', err);
      }
    }
  };

  useEffect(() => {
    if (isFinished || loading || questions.length === 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, loading, questions.length]);

  const toggleBookmarkQuestion = async (qId: string) => {
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: qId })
      });
      const data = await res.json();
      if (data.bookmarked) {
        setBookmarkedIds((prev) => [...prev, qId]);
      } else {
        setBookmarkedIds((prev) => prev.filter((id) => id !== qId));
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingQuestion) return;
    setSubmittingReport(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: reportingQuestion.id,
          questionText: reportingQuestion.question_text,
          reason: reportReason,
          details: reportDetails,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReportSubmitted(true);
        setTimeout(() => {
          setReportingQuestion(null);
          setReportSubmitted(false);
          setReportDetails('');
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to submit report', err);
    } finally {
      setSubmittingReport(false);
    }
  };

  const calculateStats = () => {
    let correctCount = 0;
    let wrongCount = 0;
    const penalty = mode === 'banking' ? 0.25 : 0.33;

    questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      if (chosen) {
        if (chosen === q.correct_option) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const unattempted = questions.length - (correctCount + wrongCount);
    const negativeDeduction = Number((wrongCount * penalty).toFixed(2));
    const netScore = Number((correctCount - negativeDeduction).toFixed(2));

    return {
      correctCount,
      wrongCount,
      unattempted,
      negativeDeduction,
      netScore,
      totalQuestions: questions.length,
      penalty
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 font-medium text-xs sm:text-sm">Loading authentic questions into quiz simulator...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">No Questions Found</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          No questions matched your selected filter criteria.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Question Bank
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const userSelected = selectedAnswers[currentQ.id];
  const isBookmarked = bookmarkedIds.includes(currentQ.id);
  const isMarkedReview = markedForReview[currentQ.id];
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionId: string) => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setVisitedQuestions((prev) => ({ ...prev, [questions[nextIdx].id]: true }));
      setMobileTab('question');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setVisitedQuestions((prev) => ({ ...prev, [questions[prevIdx].id]: true }));
      setMobileTab('question');
    }
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleClearResponse = () => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeCritical = timeLeft < 120;

  // Render Result Screen
  if (isFinished) {
    const stats = calculateStats();
    const cutOffBench = Math.round(stats.totalQuestions * 0.58);
    const hasQualified = stats.netScore >= cutOffBench;

    const filteredReviewQuestions = questions.filter((q) => {
      const ans = selectedAnswers[q.id];
      if (reviewFilter === 'correct') return ans === q.correct_option;
      if (reviewFilter === 'wrong') return ans && ans !== q.correct_option;
      if (reviewFilter === 'unattempted') return !ans;
      return true;
    });

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-2 sm:py-4">
        {/* Scorecard Hero */}
        <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden ${
          hasQualified ? 'bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900' : 'bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900'
        }`}>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur border border-white/20">
                <Award className="w-3.5 h-3.5" />
                Examination Scorecard
              </span>
              <span className="text-[11px] sm:text-xs text-white/80">
                Rule: +1 / -{stats.penalty} per negative response
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 items-center">
              <div className="md:col-span-2">
                <h1 className="text-2xl sm:text-4xl font-black mb-1">
                  Net Score: {stats.netScore} / {stats.totalQuestions}
                </h1>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-3">
                  {hasQualified 
                    ? `🎉 Excellent! You crossed the expected benchmark cut-off of ${cutOffBench} marks.`
                    : `⚠️ Benchmark cut-off is ~${cutOffBench} marks. Revise incorrect statement questions to avoid negative penalty.`}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${hasQualified ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40' : 'bg-rose-500/30 text-rose-200 border border-rose-400/40'}`}>
                    Accuracy: {stats.correctCount + stats.wrongCount > 0 ? Math.round((stats.correctCount / (stats.correctCount + stats.wrongCount)) * 100) : 0}%
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/10 text-white/90">
                    Mode: {mode.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Metrics mini-grid */}
              <div className="md:col-span-2 grid grid-cols-3 gap-2 sm:gap-3 text-center">
                <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-white/10">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">{stats.correctCount}</div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-white/70">Correct (+{stats.correctCount})</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-white/10">
                  <div className="text-xl sm:text-2xl font-black text-rose-400">{stats.wrongCount}</div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-white/70">Wrong (-{stats.negativeDeduction})</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-white/10">
                  <div className="text-xl sm:text-2xl font-black text-slate-300">{stats.unattempted}</div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-white/70">Skipped (0)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
              <ListFilter className="w-3.5 h-3.5" />
              Review:
            </span>
            {(['all', 'wrong', 'correct', 'unattempted'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setReviewFilter(tab)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold capitalize transition shrink-0 ${
                  reviewFilter === tab
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsFinished(false);
                setSelectedAnswers({});
                setMarkedForReview({});
                setCurrentIndex(0);
                setTimeLeft(questions.length * (mode === 'banking' ? 36 : 45));
                setAttemptSaved(false);
              }}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-attempt
            </button>
            <Link
              href={paperIdParam || paperCodeParam ? "/previous-papers" : "/"}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
            >
              {paperIdParam || paperCodeParam ? "All Previous Papers" : "Question Bank"}
            </Link>
          </div>
        </div>

        {/* Review Questions List */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <BookCheck className="w-4 h-4 text-emerald-600" />
            Detailed Question Review & Official Answer Keys ({filteredReviewQuestions.length})
          </h3>

          {filteredReviewQuestions.map((q, qIndex) => {
            const userAns = selectedAnswers[q.id];
            const isQCorrect = userAns === q.correct_option;
            const isUnanswered = !userAns;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-bold text-slate-500">Q#{qIndex + 1}</span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {q.category}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">
                      {q.question_type || 'Statement'}
                    </span>
                  </div>

                  <div>
                    {isUnanswered ? (
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Not Attempted
                      </span>
                    ) : isQCorrect ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> +1.00 Correct
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> -{stats.penalty} Wrong
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-pre-line">
                  {q.question_text}
                </h4>

                {/* Statements formatted */}
                {q.statements && q.statements.length > 0 && (
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-800">
                    {q.statements.map((st, sIdx) => (
                      <div key={sIdx} className="font-medium">
                        {st}
                      </div>
                    ))}
                  </div>
                )}

                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt) => {
                    const isOfficialCorrect = opt.id === q.correct_option;
                    const isCandidateChoice = opt.id === userAns;

                    let optBg = 'bg-slate-50 border-slate-200 text-slate-700';
                    if (isOfficialCorrect) {
                      optBg = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isCandidateChoice && !isOfficialCorrect) {
                      optBg = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${optBg}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] bg-white/80 border shrink-0">
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {isOfficialCorrect && (
                          <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded shrink-0">
                            Key
                          </span>
                        )}
                        {isCandidateChoice && !isOfficialCorrect && (
                          <span className="text-[9px] uppercase font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded shrink-0">
                            You
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
                    <span className="font-bold flex items-center gap-1 text-emerald-800">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Explanation:
                    </span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Test Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Exam Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href={paperIdParam || paperCodeParam ? "/previous-papers" : "/"}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition shrink-0"
            title="Exit"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-xs font-bold text-slate-900">
                Q {currentIndex + 1}/{questions.length}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded truncate">
                {currentQ.exam_name}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {currentQ.category}
            </div>
          </div>
        </div>

        {/* Center: Mode Switcher (Pill tabs) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto max-w-full">
          <button
            onClick={() => setMode('practice')}
            className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
              mode === 'practice'
                ? 'bg-white text-emerald-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => setMode('exam')}
            className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
              mode === 'exam'
                ? 'bg-white text-emerald-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            OMR (-0.33)
          </button>
          <button
            onClick={() => setMode('banking')}
            className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
              mode === 'banking'
                ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Banking
          </button>
        </div>

        {/* Right: Timer & Submit */}
        <div className="flex items-center gap-2 ml-auto">
          {mode === 'banking' && (
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200"
              title="Calculator"
            >
              <Calculator className="w-4 h-4" />
            </button>
          )}

          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-mono text-xs font-bold border ${
              isTimeCritical
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={handleFinishQuiz}
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher between Question and OMR Sheet (< lg only) */}
      <div className="flex lg:hidden bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
        <button
          onClick={() => setMobileTab('question')}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'question'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <CircleDot className="w-3.5 h-3.5" />
          <span>Question #{currentIndex + 1}</span>
        </button>

        <button
          onClick={() => setMobileTab('omr')}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'omr'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{mode === 'banking' ? 'Question Palette' : 'OMR Sheet'} ({answeredCount}/{questions.length})</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Active Question & Interactive Options (8 Cols on Desktop) */}
        <div className={`lg:col-span-8 space-y-4 ${mobileTab === 'omr' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-xs relative">
            {/* Top Toolbar within Question */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {currentQ.question_type || 'Statement'}
                </span>
                {currentQ.exam_code && (
                  <span className="text-[11px] font-semibold text-slate-500">
                    Code: {currentQ.exam_code}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleBookmarkQuestion(currentQ.id)}
                  className={`p-1.5 rounded-xl border transition ${
                    isBookmarked
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                  }`}
                  title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this question'}
                >
                  <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500' : ''}`} />
                </button>

                <button
                  onClick={() => setReportingQuestion(currentQ)}
                  className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 hover:text-rose-600 transition"
                  title="Report question error"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-sm sm:text-lg font-bold text-slate-900 leading-snug mb-3.5 whitespace-pre-line">
              {currentQ.question_text}
            </h2>

            {/* Formatted Statements (if present) */}
            {currentQ.statements && currentQ.statements.length > 0 && (
              <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/80 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Statements to Evaluate:
                </span>
                {currentQ.statements.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 shadow-2xs leading-relaxed"
                  >
                    {st}
                  </div>
                ))}
              </div>
            )}

            {/* Options List (Touch-friendly 48px+ on mobile) */}
            <div className="space-y-2.5 mb-5 sm:mb-6">
              {currentQ.options.map((option) => {
                const isSelected = userSelected === option.id;
                let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                if (mode === 'practice' && userSelected) {
                  if (option.id === currentQ.correct_option) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold ring-1 ring-emerald-500';
                  } else if (isSelected && option.id !== currentQ.correct_option) {
                    optionStyle = 'border-rose-500 bg-rose-50/80 text-rose-950 font-bold ring-1 ring-rose-500';
                  }
                } else if (isSelected) {
                  optionStyle = mode === 'banking'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-500'
                    : 'border-slate-900 bg-slate-900 text-white font-bold shadow-sm';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-center justify-between min-h-[48px] transition-all active:scale-99 ${optionStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected && mode !== 'practice'
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {option.id}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        {option.text}
                      </span>
                    </div>

                    {mode === 'practice' && userSelected && (
                      <div>
                        {option.id === currentQ.correct_option ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Practice Explanation in Practice Mode */}
            {mode === 'practice' && userSelected && currentQ.explanation && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs text-emerald-950 space-y-1 mb-5 animate-fadeIn">
                <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Official Answer & Explanation:
                </span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                {mode === 'banking' && (
                  <>
                    <button
                      onClick={handleToggleMarkReview}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-xl border transition ${
                        isMarkedReview
                          ? 'bg-purple-100 text-purple-800 border-purple-300'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isMarkedReview ? '★ Review' : 'Mark Review'}
                    </button>
                    {userSelected && (
                      <button
                        onClick={handleClearResponse}
                        className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      >
                        Clear
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-semibold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Sidebar (OMR Sheet or Banking TCS-iON Palette) */}
        <div className={`lg:col-span-4 space-y-4 ${mobileTab === 'question' ? 'hidden lg:block' : 'block'}`}>
          {/* Virtual Calculator Box (if toggled) */}
          {showCalc && (
            <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Exam Calculator</span>
                <button onClick={() => setShowCalc(false)} className="text-xs text-slate-400 hover:text-white">✕</button>
              </div>
              <div className="bg-slate-800 text-right p-3 rounded-lg text-lg font-mono mb-3 text-emerald-400 font-bold overflow-x-auto">
                {calcDisplay}
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
                {['C', '/', '*', '-'].map((b) => (
                  <button key={b} onClick={() => handleCalcClick(b)} className="bg-indigo-600 p-2 rounded">{b}</button>
                ))}
                {['7', '8', '9', '+'].map((b) => (
                  <button key={b} onClick={() => handleCalcClick(b)} className={`${b === '+' ? 'bg-indigo-600' : 'bg-slate-800'} p-2 rounded`}>{b}</button>
                ))}
                {['4', '5', '6', '='].map((b) => (
                  <button key={b} onClick={() => handleCalcClick(b)} className={`${b === '=' ? 'bg-emerald-600' : 'bg-slate-800'} p-2 rounded`}>{b}</button>
                ))}
                {['1', '2', '3', '0'].map((b) => (
                  <button key={b} onClick={() => handleCalcClick(b)} className="bg-slate-800 p-2 rounded">{b}</button>
                ))}
              </div>
            </div>
          )}

          {/* OMR Sheet Mode */}
          {mode === 'exam' || mode === 'practice' ? (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <CircleDot className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    OMR Sheet
                  </h3>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {answeredCount}/{questions.length} Shaded
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mb-2.5">
                Tap bubbles A, B, C, D to fill candidate OMR sheet:
              </p>

              {/* Scrollable OMR Sheet Grid */}
              <div className="max-h-[380px] sm:max-h-[480px] overflow-y-auto pr-1 space-y-1.5">
                {questions.map((q, qIdx) => {
                  const shaded = selectedAnswers[q.id];
                  const isCurrent = qIdx === currentIndex;

                  return (
                    <div
                      key={q.id}
                      className={`flex items-center justify-between p-2 rounded-xl border text-xs transition ${
                        isCurrent
                          ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300 font-bold'
                          : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <button
                        onClick={() => {
                          setCurrentIndex(qIdx);
                          setMobileTab('question');
                        }}
                        className="w-8 text-left font-bold text-slate-600 hover:text-emerald-700"
                      >
                        #{qIdx + 1}
                      </button>

                      <div className="flex items-center gap-2">
                        {['A', 'B', 'C', 'D'].map((bubble) => {
                          const isBubbleShaded = shaded === bubble;
                          return (
                            <button
                              key={bubble}
                              onClick={() => {
                                setCurrentIndex(qIdx);
                                handleSelectOption(bubble);
                              }}
                              className={`w-7 h-7 rounded-full border text-[11px] font-bold flex items-center justify-center transition-all ${
                                isBubbleShaded
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-inner omr-bubble-active'
                                  : 'border-slate-300 text-slate-500 bg-white hover:border-slate-400'
                              }`}
                            >
                              {bubble}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Banking TCS-iON Style Question Palette */
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    TCS-iON Question Palette
                  </h3>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[8px]">✔</span>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-md bg-rose-500 text-white flex items-center justify-center font-bold text-[8px]">✖</span>
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-[8px]">★</span>
                  <span>Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-md bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[8px]">-</span>
                  <span>Not Visited</span>
                </div>
              </div>

              {/* Palette Buttons */}
              <div className="max-h-[350px] overflow-y-auto pr-1">
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {questions.map((q, qIdx) => {
                    const ans = selectedAnswers[q.id];
                    const review = markedForReview[q.id];
                    const visited = visitedQuestions[q.id];
                    const isCur = qIdx === currentIndex;

                    let btnStyle = 'bg-slate-100 text-slate-600 border-slate-200';
                    if (ans && review) {
                      btnStyle = 'bg-purple-700 text-white border-emerald-400 ring-2 ring-emerald-400';
                    } else if (ans) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-700';
                    } else if (review) {
                      btnStyle = 'bg-purple-600 text-white border-purple-700';
                    } else if (visited) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentIndex(qIdx);
                          setVisitedQuestions((prev) => ({ ...prev, [q.id]: true }));
                          setMobileTab('question');
                        }}
                        className={`h-9 rounded-xl border text-xs font-bold flex items-center justify-center transition ${btnStyle} ${
                          isCur ? 'ring-2 ring-slate-900 scale-105' : ''
                        }`}
                      >
                        {qIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Question Modal */}
      {reportingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-500" /> Report Question Error
              </h3>
              <button onClick={() => setReportingQuestion(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="text-center py-6 text-emerald-600 space-y-2">
                <CheckCircle className="w-10 h-10 mx-auto" />
                <p className="font-bold text-sm">Issue Flagged to Content Team</p>
                <p className="text-xs text-slate-500">Thank you for keeping Kerala PSC questions accurate.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Issue Category:</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50"
                  >
                    <option value="wrong_answer">Wrong Answer Key</option>
                    <option value="statement_factual_error">Factual Error in Statement</option>
                    <option value="translation_error">Malayalam Translation Mistake</option>
                    <option value="outdated_scheme">Outdated Scheme / Data</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Details & Correction:</label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Provide book reference or official PSC gazette citation..."
                    className="w-full border rounded-xl p-2.5 bg-slate-50"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportingQuestion(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReport}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold"
                  >
                    {submittingReport ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <QuizPlayerContent />
    </Suspense>
  );
}
