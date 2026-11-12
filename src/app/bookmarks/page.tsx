'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Question } from '@/types';
import { 
  Bookmark as BookmarkIcon, 
  Trash2, 
  ArrowLeft, 
  CheckCircle2, 
  BookOpen, 
  Layers 
} from 'lucide-react';

export default function BookmarksPage() {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const res = await fetch('/api/bookmarks');
        const data = await res.json();
        setBookmarkedQuestions(data.questions || []);
      } catch (err) {
        console.error('Failed to load bookmarks', err);
      } finally {
        setLoading(false);
      }
    }
    loadBookmarks();
  }, []);

  const handleRemoveBookmark = async (qId: string) => {
    try {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: qId })
      });
      setBookmarkedQuestions(prev => prev.filter(q => q.id !== qId));
    } catch (err) {
      console.error('Failed to remove bookmark', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookmarkIcon className="w-7 h-7 text-amber-500 fill-amber-500" />
            Bookmarked Revision Statements
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review tricky or high-yield statement questions saved during your practice sessions.
          </p>
        </div>

        <Link
          href="/quiz"
          className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition shadow"
        >
          Practice More
        </Link>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading your saved questions...</div>
      ) : bookmarkedQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <BookmarkIcon className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">No Bookmarks Saved Yet</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            While taking a quiz, click the "Bookmark" button on tricky questions to save them for revision here.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-emerald-700 transition"
          >
            Start Practice Quiz
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex gap-2 items-center">
                  <span className="font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                    #{idx + 1}
                  </span>
                  <span className="font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">
                    {q.year}
                  </span>
                  <span className="font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {q.category}
                  </span>
                  <span className="text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md">
                    {q.sub_category}
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveBookmark(q.id)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              <div className="font-bold text-slate-900 text-sm">
                {q.question_text}
              </div>

              {/* Statements */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                {q.statements.map((stmt, sIdx) => (
                  <div key={sIdx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{stmt}</span>
                  </div>
                ))}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                      opt.id === q.correct_option
                        ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="w-5 h-5 rounded bg-white border border-slate-300 flex items-center justify-center font-bold">
                      {opt.id}
                    </span>
                    <span className="truncate">{opt.text}</span>
                  </div>
                ))}
              </div>

              {/* Explanation */}
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900">
                <span className="font-bold">Correct Answer: ({q.correct_option})</span> — {q.explanation}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
