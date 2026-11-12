'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Calendar, 
  Clock, 
  FileText, 
  ExternalLink, 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  BookOpen, 
  Briefcase, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { ExamNotification } from '@/types';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<ExamNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedQual, setSelectedQual] = useState<string>('all');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await fetch('/api/notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error('Failed to load notifications:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNotifications();
  }, []);

  const filteredNotifications = notifications.filter((item) => {
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

    if (selectedQual !== 'all') {
      const q = item.qualification.toLowerCase();
      if (selectedQual === 'degree' && !q.includes('degree') && !q.includes('graduation')) return false;
      if (selectedQual === '10th' && !q.includes('10th') && !q.includes('sslc')) return false;
      if (selectedQual === 'plus-two' && !q.includes('higher secondary') && !q.includes('+2')) return false;
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchName = item.post_name.toLowerCase().includes(term);
      const matchCat = item.category_number.toLowerCase().includes(term);
      const matchDept = item.department.toLowerCase().includes(term);
      if (!matchName && !matchCat && !matchDept) return false;
    }

    return true;
  });

  const getDaysRemaining = (dateString: string) => {
    const target = new Date(dateString);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <Bell className="w-3.5 h-3.5" />
            Kerala PSC Thulasi Exam Calendar (2024-2025)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Upcoming Kerala PSC Exam Notifications
          </h1>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-4">
            Track official Kerala PSC Gazette notifications, category numbers, syllabus breakdowns, application deadlines, and practice direct exam-tailored mock questions.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Category Numbers</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Deadline Countdown</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Direct Mock Tests</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-3 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by post, category no, dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Applications</option>
            <option value="upcoming">Upcoming Exams</option>
          </select>

          <select
            value={selectedQual}
            onChange={(e) => setSelectedQual(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Qualifications</option>
            <option value="degree">Graduation / Degree</option>
            <option value="plus-two">Higher Secondary (+2)</option>
            <option value="10th">SSLC / 10th Pass</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-500 text-sm">Loading Kerala PSC notifications...</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No matching notifications found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search criteria or resetting filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredNotifications.map((item) => {
            const daysLeft = getDaysRemaining(item.last_date);
            const isClosingSoon = daysLeft > 0 && daysLeft <= 15;
            const isExpanded = expandedSyllabusId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Header bar */}
                <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-md tracking-wider">
                        CAT NO. {item.category_number}
                      </span>
                      {item.is_featured && (
                        <span className="bg-amber-100 text-amber-800 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-600" />
                          Featured
                        </span>
                      )}
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          item.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Deadline Badge */}
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      <Clock className={`w-3.5 h-3.5 ${isClosingSoon ? 'text-rose-600 animate-bounce' : 'text-slate-400'}`} />
                      <span className={isClosingSoon ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                        Last Date: {item.last_date}
                      </span>
                      {daysLeft > 0 ? (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isClosingSoon ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          ({daysLeft}d left)
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-600 font-bold">
                          Closed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Name */}
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-1 leading-snug">
                    {item.post_name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-3 sm:mb-4">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Department: <strong className="text-slate-700 font-semibold">{item.department}</strong></span>
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase mb-0.5">Scale of Pay</span>
                      <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">{item.scale_of_pay}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase mb-0.5">Vacancies</span>
                      <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">{item.vacancies}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase mb-0.5">Qualification</span>
                      <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">{item.qualification}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase mb-0.5">Exam Schedule</span>
                      <span className="font-semibold text-emerald-700 text-[11px] sm:text-xs">{item.exam_date}</span>
                    </div>
                  </div>
                </div>

                {/* Syllabus Drawer */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 py-3.5 bg-emerald-50/40 border-t border-emerald-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                      Detailed Syllabus Breakdown & Mark Distribution
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 mb-2">
                      {item.syllabus.map((syl, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-emerald-100 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{syl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Footer */}
                <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    onClick={() => setExpandedSyllabusId(isExpanded ? null : item.id)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 py-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {isExpanded ? 'Hide Syllabus' : 'View Syllabus Structure'}
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link
                      href={`/quiz?category=${encodeURIComponent(item.recommended_category_id)}&mode=quiz`}
                      className="flex-1 sm:flex-initial text-center px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition"
                    >
                      Start Mock Test
                    </Link>

                    <a
                      href={item.thulasi_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial text-center px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      PSC Thulasi
                    </a>
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
