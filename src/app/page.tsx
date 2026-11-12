'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Category, Question, QuestionBankStats } from '@/types';
import { 
  BookOpen, 
  Calendar, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  History, 
  Landmark, 
  Compass, 
  Atom, 
  Newspaper,
  Calculator,
  Languages,
  Cpu,
  Search,
  Bell,
  FileText,
  Zap,
  Bookmark as BookmarkIcon,
  HelpCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Check,
  XCircle,
  GraduationCap,
  X
} from 'lucide-react';

const iconMap: Record<string, any> = {
  ScrollText: History,
  Scale: Landmark,
  Globe: Compass,
  Atom: Atom,
  Newspaper: Newspaper,
  Calculator: Calculator,
  Languages: Languages,
  Landmark: Landmark,
  Cpu: Cpu,
  BookOpen: BookOpen,
};

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<QuestionBankStats | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(15);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Interactive Question Card State
  const [userSelectedMap, setUserSelectedMap] = useState<Record<string, string>>({});
  const [showExplanationMap, setShowExplanationMap] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  // Load Categories & Initial Stats
  useEffect(() => {
    async function loadMeta() {
      try {
        const [catsRes, statsRes, bookRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/questions?mode=stats'),
          fetch('/api/bookmarks')
        ]);
        const catsData = await catsRes.json();
        const statsData = await statsRes.json();
        const bookData = await bookRes.json();

        setCategories(catsData);
        setStats(statsData);
        if (bookData.bookmarkIds) setBookmarkedIds(bookData.bookmarkIds);
      } catch (err) {
        console.error('Failed to load metadata:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMeta();
  }, []);

  // Fetch paginated questions when filters or page changes
  const loadQuestions = useCallback(async () => {
    setQuestionsLoading(true);
    try {
      const q = new URLSearchParams();
      q.set('page', String(currentPage));
      q.set('limit', String(limit));

      if (selectedCategory !== 'All') q.set('category', selectedCategory);
      if (selectedSubCategory !== 'All') q.set('sub_category', selectedSubCategory);
      if (selectedYear !== 'All') q.set('year', selectedYear);
      if (selectedType !== 'all') q.set('type', selectedType);
      if (selectedLanguage !== 'all') q.set('language', selectedLanguage);
      if (selectedDifficulty !== 'all') q.set('difficulty', selectedDifficulty);
      if (searchTerm.trim() !== '') q.set('search', searchTerm.trim());

      const res = await fetch(`/api/questions?${q.toString()}`);
      const data = await res.json();

      setQuestions(data.questions || []);
      setTotalQuestions(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to query questions:', err);
    } finally {
      setQuestionsLoading(false);
    }
  }, [currentPage, limit, selectedCategory, selectedSubCategory, selectedYear, selectedType, selectedLanguage, selectedDifficulty, searchTerm]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadQuestions();
  };

  const handleSelectOptionInCard = (qId: string, optId: string) => {
    setUserSelectedMap((prev) => ({ ...prev, [qId]: optId }));
    setShowExplanationMap((prev) => ({ ...prev, [qId]: true }));
  };

  const toggleBookmark = async (qId: string) => {
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
      console.error('Bookmark toggle failed:', err);
    }
  };

  const currentCategoryObj = categories.find(
    (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-5 sm:p-10 shadow-2xl border border-emerald-800/40">
        <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/15 via-teal-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] sm:text-xs font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            All-In-One Kerala PSC & Banking Hub
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            11,400+ Verified Kerala PSC <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Questions (2020-2025)
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl">
            Degree Level Prelims, LDC 2024-2025, Secretariat Assistant, KAS, and Kerala Bank with statement questions, negative marking, and mobile-friendly test simulator.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-1 sm:pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs">
            <div className="bg-slate-800/80 backdrop-blur p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-700/80">
              <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold">Total Question Bank</span>
              <span className="text-lg sm:text-xl font-black text-white">{stats ? stats.total.toLocaleString() : '11,400'}+ Qs</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-700/80">
              <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold">2024-2025 Questions</span>
              <span className="text-lg sm:text-xl font-black text-emerald-400">7,600+ Qs</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-700/80">
              <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold">Statement & Match</span>
              <span className="text-lg sm:text-xl font-black text-amber-400">{stats ? (stats.statementCount + stats.matchCount).toLocaleString() : '2,900'}+ Qs</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-700/80">
              <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold">Syllabus Streams</span>
              <span className="text-lg sm:text-xl font-black text-blue-400">10 Subjects</span>
            </div>
          </div>

          {/* Main Action CTAs */}
          <div className="pt-2 flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/quiz?mode=exam&limit=50"
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-lg transition active:scale-95 text-xs sm:text-sm"
            >
              <CircleDot className="w-4 h-4" />
              Start Full 100-Mark OMR Mock
            </Link>
            <Link
              href="/current-affairs"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-md transition active:scale-95 text-xs sm:text-sm"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              2025 Current Affairs 🔥
            </Link>
            <Link
              href="/previous-papers"
              className="inline-flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-slate-700 transition text-xs sm:text-sm"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              2024-2025 Papers
            </Link>
            <Link
              href="/notifications"
              className="inline-flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-slate-700 transition text-xs sm:text-sm"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              Exam Notifications
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Mobile Feature Navigation Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        <Link
          href="/current-affairs"
          className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-amber-400 shadow-2xs hover:shadow-sm transition group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs sm:text-sm mb-2 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5 group-hover:text-amber-700">
            Daily Current Affairs
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2">
            Daily 2025 exam capsules with instant PSC question test cards.
          </p>
        </Link>

        <Link
          href="/quiz?type=statement&mode=practice&limit=25"
          className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-2xs hover:shadow-sm transition group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs sm:text-sm mb-2 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
          </div>
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5 group-hover:text-emerald-700">
            Statement Master
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2">
            Multi-statement evaluation (1, 2, 3 correct) for KAS & Degree.
          </p>
        </Link>

        <Link
          href="/previous-papers"
          className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-sm transition group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs sm:text-sm mb-2 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
          </div>
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5 group-hover:text-blue-700">
            Papers (2020-25)
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2">
            Latest 2024 & 2025 question papers with official keys.
          </p>
        </Link>

        <Link
          href="/notifications"
          className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-rose-400 shadow-2xs hover:shadow-sm transition group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs sm:text-sm mb-2 group-hover:scale-105 transition-transform">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-rose-700" />
          </div>
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5 group-hover:text-rose-700">
            PSC Notifications
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2">
            Thulasi categories, deadlines, and direct apply links.
          </p>
        </Link>

        <Link
          href="/banking"
          className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-2xs hover:shadow-sm transition group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs sm:text-sm mb-2 group-hover:scale-105 transition-transform">
            <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-700" />
          </div>
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5 group-hover:text-indigo-700">
            Banking Speed Drills
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2">
            Kerala Bank & IBPS speed tests with virtual calculator.
          </p>
        </Link>
      </div>

      {/* Syllabus Categories Bar (Horizontal Scrollable on Mobile) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Explore by Subject
          </h2>
          <span className="text-[11px] font-semibold text-slate-400">
            Swipe & tap
          </span>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-1.5 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubCategory('All');
              setCurrentPage(1);
            }}
            className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Subjects ({stats ? stats.total.toLocaleString() : '11,400'})
          </button>

          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            const isSel = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            const count = stats?.byCategory[cat.name] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSel ? 'All' : cat.name);
                  setSelectedSubCategory('All');
                  setCurrentPage(1);
                }}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  isSel
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSel ? 'text-white' : 'text-emerald-600'}`} />
                <span>{cat.name}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSel ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-xs space-y-3 sm:space-y-4">
        {/* Row 1: Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 11,400+ questions (Vaikom, Article 21, Simple Interest, സന്ധി)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition shrink-0"
          >
            Search
          </button>
        </form>

        {/* Quick Year Pill Selectors (Mobile Friendly) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 text-[11px] font-bold mr-1 shrink-0">Year:</span>
          {['All', '2025', '2024', '2023', '2022', '2021'].map((yr) => {
            const isYSelected = selectedYear === yr;
            return (
              <button
                key={yr}
                onClick={() => {
                  setSelectedYear(yr);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition shrink-0 ${
                  isYSelected
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {yr === '2025' ? '2025 🔥' : yr}
              </button>
            );
          })}
        </div>

        {/* Row 2: Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Question Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
          >
            <option value="all">All Question Types</option>
            <option value="statement">Statement-Based (1, 2, 3)</option>
            <option value="mcq">Multiple Choice (MCQ)</option>
            <option value="match">Match the Following</option>
            <option value="assertion">Assertion & Reason</option>
          </select>

          {/* Subcategory Filter (if category selected) */}
          {currentCategoryObj && (
            <select
              value={selectedSubCategory}
              onChange={(e) => {
                setSelectedSubCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            >
              <option value="All">All Topics in {currentCategoryObj.name}</option>
              {currentCategoryObj.sub_categories.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          )}

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
          >
            <option value="all">All Languages</option>
            <option value="en">English</option>
            <option value="ml">മലയാളം (Malayalam)</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy Level</option>
            <option value="medium">Medium Standard</option>
            <option value="hard">Advanced / Hard</option>
          </select>

          {/* Reset button */}
          {(selectedCategory !== 'All' || selectedType !== 'all' || selectedYear !== 'All' || selectedLanguage !== 'all' || searchTerm !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubCategory('All');
                setSelectedType('all');
                setSelectedYear('All');
                setSelectedLanguage('all');
                setSelectedDifficulty('all');
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="text-slate-500 hover:text-rose-600 font-semibold px-2 py-1 text-xs"
            >
              Reset
            </button>
          )}

          {/* Direct Quiz Trigger */}
          <Link
            href={`/quiz?category=${encodeURIComponent(selectedCategory)}&type=${selectedType}&year=${selectedYear}&limit=25&mode=quiz`}
            className="ml-auto bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Practice These in</span> Quiz Mode
          </Link>
        </div>
      </div>

      {/* Question Results Section */}
      <div className="space-y-4">
        {/* Results Info Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <div>
            Showing <span className="font-bold text-slate-900">{(currentPage - 1) * limit + 1}</span> to{' '}
            <span className="font-bold text-slate-900">{Math.min(currentPage * limit, totalQuestions)}</span> of{' '}
            <span className="font-bold text-slate-900">{totalQuestions.toLocaleString()}</span> Questions
          </div>
          <div className="flex items-center gap-1">
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        </div>

        {/* Question Cards List */}
        {questionsLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-slate-500 text-xs font-medium">Filtering question bank...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">No questions found</h3>
            <p className="text-xs text-slate-500">Try broadening your search term or filter parameters.</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {questions.map((q, index) => {
              const qNumber = (currentPage - 1) * limit + index + 1;
              const userChoice = userSelectedMap[q.id];
              const showExp = showExplanationMap[q.id];
              const isSaved = bookmarkedIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-4 sm:p-6 shadow-2xs transition space-y-3"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2.5 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="font-bold text-slate-400">#{qNumber}</span>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md uppercase text-[10px]">
                        {q.category}
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md uppercase text-[10px]">
                        {q.question_type || 'Statement'}
                      </span>
                      <span className="bg-blue-50 text-blue-800 font-bold px-1.5 py-0.5 rounded-md text-[10px]">
                        {q.year}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[140px] sm:max-w-none">
                        {q.exam_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          isSaved
                            ? 'bg-rose-50 border-rose-200 text-rose-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                        title={isSaved ? 'Bookmarked' : 'Bookmark this question'}
                      >
                        <BookmarkIcon className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-pre-line">
                    {q.question_text}
                  </h3>

                  {/* Statements Box if Present */}
                  {q.statements && q.statements.length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 text-xs text-slate-800 font-medium leading-relaxed">
                      {q.statements.map((st, sIdx) => (
                        <div key={sIdx}>{st}</div>
                      ))}
                    </div>
                  )}

                  {/* Interactive Options Grid (Touch-optimized) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt) => {
                      const isChosen = userChoice === opt.id;
                      const isAnswerCorrect = opt.id === q.correct_option;

                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                      if (userChoice) {
                        if (isAnswerCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400';
                        } else if (isChosen) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOptionInCard(q.id, opt.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between min-h-[44px] transition ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-white border flex items-center justify-center font-bold text-[10px] shrink-0">
                              {opt.id}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </div>

                          {userChoice && isAnswerCorrect && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                          )}
                          {userChoice && isChosen && !isAnswerCorrect && (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Toggle Explanation & Official Answer */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      onClick={() => setShowExplanationMap((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      {showExp ? 'Hide Answer Key' : 'View Answer Key & Notes'}
                    </button>
                    {userChoice && (
                      <span className={`text-[11px] font-bold ${
                        userChoice === q.correct_option ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {userChoice === q.correct_option ? '✔ Correct!' : '✖ Incorrect'}
                      </span>
                    )}
                  </div>

                  {showExp && q.explanation && (
                    <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-100 text-xs text-emerald-950 space-y-1">
                      <div className="font-bold flex items-center gap-1 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Official Key: ({q.correct_option})
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 pb-2">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1 text-xs font-bold"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
              <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white">
                {currentPage}
              </span>
              <span>/</span>
              <span className="px-2 py-1">{totalPages}</span>
            </div>

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1 text-xs font-bold"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
