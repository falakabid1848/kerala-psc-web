'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuizAttempt } from '@/lib/db';
import { 
  Trophy, 
  Target, 
  Clock, 
  BarChart2, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';

export default function AnalyticsPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAttempts() {
      try {
        const res = await fetch('/api/attempts');
        const data = await res.json();
        setAttempts(data);
      } catch (err) {
        console.error('Failed to load attempts', err);
      } finally {
        setLoading(false);
      }
    }
    loadAttempts();
  }, []);

  const totalQuizzes = attempts.length;
  const avgScore = totalQuizzes > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalQuizzes)
    : 0;
  const totalQuestionsAnswered = attempts.reduce((sum, a) => sum + a.totalQuestions, 0);

  // Group by category to find strengths & weaknesses
  const categoryStats: Record<string, { total: number; correct: number }> = {};
  attempts.forEach((a) => {
    const cat = a.categoryFilter === 'All' ? 'Mixed Topics' : a.categoryFilter;
    if (!categoryStats[cat]) {
      categoryStats[cat] = { total: 0, correct: 0 };
    }
    categoryStats[cat].total += a.totalQuestions;
    categoryStats[cat].correct += a.score;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <BarChart2 className="w-8 h-8 text-emerald-600" />
          Performance & Score Analytics
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Track your statement question accuracy across Kerala PSC exam years and categories.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{totalQuizzes}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tests Completed
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{avgScore}%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Average Accuracy
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{totalQuestionsAnswered}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Statements Solved
            </div>
          </div>
        </div>
      </div>

      {/* Topic Accuracy Breakdown */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Topic-Wise Mastery
        </h2>

        {Object.keys(categoryStats).length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed">
            No quiz attempts yet. Complete a quiz session to view your strengths and weaknesses!
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([cat, stats]) => {
              const accuracy = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>{cat}</span>
                    <span className="text-emerald-700">{accuracy}% ({stats.correct}/{stats.total} correct)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${
                        accuracy >= 70
                          ? 'bg-emerald-600'
                          : accuracy >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Attempts Table */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Recent Quiz Attempts
          </h2>
          <Link
            href="/quiz"
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            Take New Quiz <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {attempts.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed">
            No attempts recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Category / Subtopic</th>
                  <th className="p-3">Year</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Accuracy</th>
                  <th className="p-3">Time Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-medium text-slate-900">
                      {new Date(att.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{att.categoryFilter}</span>
                      {att.subCategoryFilter !== 'All' && (
                        <span className="text-slate-400 ml-1">({att.subCategoryFilter})</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                        {att.yearFilter}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      {att.score} / {att.totalQuestions}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold ${
                          att.percentage >= 70
                            ? 'bg-emerald-100 text-emerald-800'
                            : att.percentage >= 50
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {att.percentage}%
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">
                      {Math.floor(att.timeTakenSeconds / 60)}m {att.timeTakenSeconds % 60}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
