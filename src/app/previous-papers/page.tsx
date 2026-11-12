'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Download, 
  PlayCircle, 
  Calendar, 
  Clock, 
  Award, 
  Filter, 
  Search, 
  CheckCircle, 
  Layers,
  Sparkles,
  HelpCircle,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { PreviousPaper } from '@/types';

export default function PreviousPapersPage() {
  const [papers, setPapers] = useState<PreviousPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  useEffect(() => {
    async function loadPapers() {
      try {
        const res = await fetch('/api/previous-papers');
        const data = await res.json();
        setPapers(data);
      } catch (err) {
        console.error('Failed to load previous papers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPapers();
  }, []);

  const filteredPapers = papers.filter((p) => {
    if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (selectedYear !== 'All' && String(p.year) !== selectedYear) return false;

    if (search.trim() !== '') {
      const s = search.toLowerCase();
      const matchName = p.exam_name.toLowerCase().includes(s);
      const matchCode = p.question_code.toLowerCase().includes(s);
      const matchDesc = p.description.toLowerCase().includes(s);
      if (!matchName && !matchCode && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-3">
            <FileText className="w-3.5 h-3.5" />
            Official Kerala PSC Papers (2020-2025) & Answer Keys
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Kerala PSC Previous Question Papers
          </h1>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-4">
            Practice real 2024 and 2025 examination question papers online with negative marking (-0.33) and timer, or download authentic PDFs and official final keys with question codes.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official 2024-2025 Papers</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>75-Min Interactive Test Mode</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Cut-off Marks Included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search papers, code (e.g. 034/2024)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Degree Level">Degree Level</option>
            <option value="10th Level">10th Level (LDC/VFA)</option>
            <option value="KAS">KAS (Kerala Admin Service)</option>
            <option value="Police">Police (SI & CPO)</option>
            <option value="Banking">Banking (Kerala Bank)</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Years</option>
            <option value="2025">2025 (Latest)</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>

      {/* Papers Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-500 text-sm">Loading authentic previous papers (2020-2025)...</p>
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No previous papers match your filters</h3>
          <p className="text-xs text-slate-500">Try selecting a different year or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPapers.map((paper) => {
            const isLatest = paper.year >= 2024;

            return (
              <div
                key={paper.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5">
                  {/* Paper Code and Stage */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-blue-100 text-blue-900 text-[11px] font-bold px-2 py-0.5 rounded-md tracking-wider">
                        CODE: {paper.question_code}
                      </span>
                      {isLatest && (
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                          {paper.year} LATEST
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {paper.year}
                    </span>
                  </div>

                  {/* Exam Title */}
                  <Link href={`/previous-papers/${paper.id}`} className="group block">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition mb-2 leading-snug">
                      {paper.exam_name}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                    {paper.description}
                  </p>

                  {/* Details Badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Questions</span>
                      <span className="font-bold text-slate-800">{paper.total_questions} Questions</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Duration</span>
                      <span className="font-bold text-slate-800">{paper.duration_minutes} Mins</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Category</span>
                      <span className="font-bold text-slate-800">{paper.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Cut-off Mark</span>
                      <span className="font-bold text-emerald-700">{paper.cut_off || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
                  <Link
                    href={`/quiz?paper_id=${paper.id}&mode=exam`}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition active:scale-98"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Solve Live as Mock Test (75m)
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/previous-papers/${paper.id}?view=paper`}
                      className="py-2 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-1 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      Paper PDF
                    </Link>
                    <Link
                      href={`/previous-papers/${paper.id}?view=key`}
                      className="py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-1 transition"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                      Answer Key
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
