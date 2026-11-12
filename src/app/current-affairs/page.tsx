'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar, 
  Search, 
  Filter, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  PlayCircle, 
  BookOpen, 
  Printer, 
  Share2, 
  Check, 
  Tag, 
  ChevronDown, 
  ChevronUp,
  Layers,
  Award,
  Globe,
  MapPin,
  Cpu,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { CurrentAffairEntry } from '@/types';

function CurrentAffairsContent() {
  const searchParams = useSearchParams();
  const initialMonth = searchParams.get('month') || 'All';
  const initialCat = searchParams.get('category') || 'All';

  const [entries, setEntries] = useState<CurrentAffairEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [search, setSearch] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const months = [
    { label: 'All 2025 🔥', value: 'All' },
    { label: 'January 2025', value: 'January 2025' },
    { label: 'February 2025', value: 'February 2025' },
    { label: 'March 2025', value: 'March 2025' },
  ];

  const categories = [
    { label: 'All', value: 'All', icon: Layers },
    { label: 'Kerala', value: 'Kerala', icon: MapPin },
    { label: 'National', value: 'National', icon: Globe },
    { label: 'Science & Tech', value: 'Science & Tech', icon: Cpu },
    { label: 'Sports', value: 'Sports', icon: Trophy },
    { label: 'Awards & Honors', value: 'Awards & Honors', icon: Award },
  ];

  useEffect(() => {
    async function loadCurrentAffairs() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (selectedMonth !== 'All') query.set('month', selectedMonth);
        if (selectedCategory !== 'All') query.set('category', selectedCategory);
        if (search.trim()) query.set('search', search.trim());

        const res = await fetch(`/api/current-affairs?${query.toString()}`);
        const data = await res.json();
        setEntries(data.entries || []);
      } catch (err) {
        console.error('Failed to load current affairs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCurrentAffairs();
  }, [selectedMonth, selectedCategory, search]);

  const toggleQuestionExpand = (id: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAnswer = (entryId: string, optId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [entryId]: optId,
    }));
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Kerala':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'National':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Science & Tech':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Sports':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Awards & Honors':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden print:hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            2025 Daily Current Affairs &amp; PSC Question Bank
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Kerala PSC Daily Current Affairs (2025)
          </h1>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-4">
            Curated daily exam facts from January 2025 onwards with Malayalam translations, key bullet points, and expected PSC practice questions designed for Degree Level, LDC, KAS, and Kerala Bank exams.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/quiz?category=Current+Affairs+%26+Schemes&year=2025&mode=exam"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition transform active:scale-98"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Practice 2025 Current Affairs Mock Quiz</span>
            </Link>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 px-3.5 py-2.5 rounded-xl transition"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print / Save PDF Digest</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 px-3.5 py-2.5 rounded-xl transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Month Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none print:hidden">
        {months.map((m) => (
          <button
            key={m.value}
            onClick={() => setSelectedMonth(m.value)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
              selectedMonth === m.value
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-2xs space-y-3 print:hidden">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 2025 events, schemes, awards, personalities (e.g. K-SMART, Vizhinjam, ISRO, Budget)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => {
            const Icon = c.icon;
            const isSelected = selectedCategory === c.value;

            return (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Printable Heading */}
      <div className="hidden print:block text-center border-b pb-4 mb-4">
        <h2 className="text-xl font-bold uppercase">Kerala PSC Daily Current Affairs Digest (2025)</h2>
        <p className="text-xs text-slate-600">keralapsc.xyz &bull; Curated Exam Capsule from January 2025 onwards</p>
      </div>

      {/* Current Affairs Stream */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-500 text-sm">Loading 2025 daily current affairs...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No current affairs match your filter</h3>
          <p className="text-xs text-slate-500">Try selecting another month or clearing your search query.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => {
            const isExpanded = expandedQuestions[entry.id];
            const chosenAnswer = selectedAnswers[entry.id];
            const hasAnswered = Boolean(chosenAnswer);
            const isCorrect = chosenAnswer === entry.psc_potential_question.correct_option;

            return (
              <article
                key={entry.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition p-4 sm:p-6"
              >
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {entry.display_date}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCategoryColor(entry.category)}`}>
                      {entry.category}
                    </span>
                    {entry.is_trending && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded uppercase">
                        <Sparkles className="w-2.5 h-2.5" /> High Yield
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                    {entry.month}
                  </span>
                </div>

                {/* English Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 leading-snug">
                  {entry.title}
                </h3>

                {/* Malayalam Title */}
                <p className="text-xs sm:text-sm text-emerald-800 font-semibold kerala-font mb-3 leading-relaxed">
                  {entry.malayalam_title}
                </p>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
                  {entry.summary}
                </p>

                {/* Key Bullet Facts */}
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100 space-y-1.5 mb-4 text-xs text-slate-700 font-medium">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Essential PSC Exam Facts:
                  </div>
                  {entry.key_points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Expected PSC Question Box */}
                <div className="border border-emerald-200/80 bg-emerald-50/40 rounded-xl overflow-hidden transition">
                  <button
                    onClick={() => toggleQuestionExpand(entry.id)}
                    className="w-full p-3 sm:p-3.5 flex items-center justify-between gap-2 text-left hover:bg-emerald-50/80 transition"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-emerald-950">
                        Expected PSC Question from this event
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 shrink-0">
                      {isExpanded ? 'Hide' : 'Solve & View'}
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-3 sm:p-4 pt-0 border-t border-emerald-100 space-y-3">
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                        {entry.psc_potential_question.question_text}
                      </div>

                      {/* 4 Interactive Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {entry.psc_potential_question.options.map((opt) => {
                          const isOptionSelected = chosenAnswer === opt.id;
                          const isOptionCorrect = opt.id === entry.psc_potential_question.correct_option;

                          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300';
                          if (hasAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-semibold';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectAnswer(entry.id, opt.id)}
                              className={`p-2.5 rounded-lg border text-xs text-left flex items-center gap-2 transition ${btnStyle}`}
                            >
                              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                                {opt.id}
                              </span>
                              <span className="leading-snug">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Answer Explanation once attempted or revealed */}
                      {hasAnswered && (
                        <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect ? 'bg-emerald-100/70 text-emerald-950' : 'bg-rose-50 text-rose-950'
                        }`}>
                          <div className="font-bold flex items-center gap-1.5 mb-1">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                <span className="text-emerald-800">Correct! Option {entry.psc_potential_question.correct_option}</span>
                              </>
                            ) : (
                              <>
                                <span className="text-rose-700 font-bold">Incorrect.</span>
                                <span>Correct Answer: Option {entry.psc_potential_question.correct_option}</span>
                              </>
                            )}
                          </div>
                          <p className="text-slate-700">{entry.psc_potential_question.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Tags Footer */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100">
                  <Tag className="w-3 h-3 text-slate-400" />
                  {entry.tags.map((t) => (
                    <span key={t} className="text-[10px] font-semibold text-slate-500 hover:text-emerald-700 transition">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CurrentAffairsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CurrentAffairsContent />
    </Suspense>
  );
}
