'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, RotateCcw, Clock, AlertCircle } from 'lucide-react';

interface SavedSession {
  questions: any[];
  currentIndex: number;
  selectedAnswers: Record<string, string>;
  timeLeft: number;
  mode: string;
  timestamp: number;
}

export default function ResumeQuizBanner({ className = '' }: { className?: string }) {
  const [session, setSession] = useState<SavedSession | null>(null);

  useEffect(() => {
    try {
      const savedStr = localStorage.getItem('kerala_psc_saved_quiz');
      if (savedStr) {
        const parsed = JSON.parse(savedStr);
        if (parsed.questions && parsed.questions.length > 0) {
          setSession(parsed);
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }, []);

  if (!session) return null;

  const minutes = Math.floor(session.timeLeft / 60);
  const seconds = session.timeLeft % 60;
  const answeredCount = Object.keys(session.selectedAnswers || {}).length;

  const handleDiscard = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to discard this quiz attempt?')) {
      localStorage.removeItem('kerala_psc_saved_quiz');
      setSession(null);
    }
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 sm:p-5 shadow-xl border border-emerald-600/40 animate-pulse-subtle ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black shrink-0 shadow-md">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                Active Session
              </span>
              <span className="text-xs text-emerald-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')} remaining
              </span>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Resume Your Quiz (Question {session.currentIndex + 1} of {session.questions.length})
            </h3>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              {answeredCount} answers recorded • Resume right where you left off
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/quiz?resume=true&mode=exam"
            className="px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" /> Resume Quiz
          </Link>
          <button
            onClick={handleDiscard}
            className="px-3 py-2.5 text-xs text-emerald-300 hover:text-white rounded-xl font-medium transition"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
