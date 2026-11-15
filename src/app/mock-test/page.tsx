import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Timer, ShieldCheck, CheckCircle2, Play, Users, BarChart3, BookOpen } from 'lucide-react';
import ResumeQuizBanner from '@/components/ResumeQuizBanner';

export const metadata: Metadata = {
  title: 'Kerala PSC Mock Test 2026: Free 100-Mark OMR Exam Simulator & Answer Keys',
  description: 'Attend free online Kerala PSC Mock Tests (100 Marks, 75 Minutes). Features realistic OMR simulator, -0.33 negative marking, instant rank card, and 100,000+ statement questions for Degree Level, LDC, and KAS.',
  keywords: [
    'kerala psc mock test',
    'kerala psc online test',
    'kerala psc free mock test 2026',
    'kerala psc 100 mark mock test',
    'kerala psc omr exam simulator',
    'ldc mock test 2026',
    'degree level prelims mock test',
    'kerala bank clerk mock test'
  ],
  alternates: {
    canonical: 'https://www.keralapsc.xyz/mock-test',
  },
};

export default function MockTestLandingPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the pattern of Kerala PSC Degree Level and LDC Preliminary exams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The examination consists of 100 objective multiple choice and statement questions carrying 100 marks with a duration of 75 minutes (1 hour 15 minutes). Each correct answer awards +1 mark and each wrong answer deducts 1/3 (-0.33) marks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these Kerala PSC mock tests free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with unlimited attempts, real-time negative mark calculation, full explanations in Malayalam and English, and performance analytics.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Mock Test 2026</span>
        </nav>

        <ResumeQuizBanner className="mb-6" />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-4">
            75-Minute OMR Exam Simulator
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Kerala PSC Online Mock Test 2026: 100 Marks Practice Exam
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Experience the real Kerala PSC exam environment with our realistic 100-mark simulator. Features 75-minute countdown timer, official -0.33 negative marking, and instant result scorecard with verified answer keys.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/quiz?mode=exam&limit=100"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition active:scale-95 text-sm"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              Start 100-Mark Full Mock Test
            </Link>
            <Link
              href="/quiz?mode=practice&limit=25"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl border border-white/20 transition text-sm"
            >
              Quick 25-Question Practice
            </Link>
          </div>
        </div>

        {/* Exam Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
            <Award className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <span className="block text-xl font-extrabold text-slate-900">100</span>
            <span className="text-xs text-slate-500">Total Marks</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
            <Timer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="block text-xl font-extrabold text-slate-900">75 Mins</span>
            <span className="text-xs text-slate-500">Exam Duration</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-rose-600 mx-auto mb-2" />
            <span className="block text-xl font-extrabold text-rose-600">-0.33</span>
            <span className="text-xs text-slate-500">Negative Mark</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
            <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="block text-xl font-extrabold text-slate-900">100k+</span>
            <span className="text-xs text-slate-500">Question Pool</span>
          </div>
        </div>

        {/* Available Mock Tests */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs mb-10 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Select Exam Category for Live Mock Test</h2>

          <div className="space-y-3">
            <Link
              href="/quiz?category=Kerala History & Culture&mode=exam&limit=50"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition group"
            >
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700">Kerala Renaissance &amp; History Drill</h4>
                <p className="text-xs text-slate-500">Sree Narayana Guru, Ayyankali, Temple Entry Proclamation, Vaikom Satyagraha</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">50 Qs</span>
            </Link>

            <Link
              href="/quiz?category=Indian Polity & Constitution&mode=exam&limit=50"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition group"
            >
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700">Indian Constitution &amp; Polity Mock Test</h4>
                <p className="text-xs text-slate-500">Fundamental Rights, Writs, DPSP, Parliament, CAG, Election Commission</p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">50 Qs</span>
            </Link>

            <Link
              href="/quiz?language=ml&type=statement&mode=exam&limit=50"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/50 transition group"
            >
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-rose-700">മലയാളം സ്റ്റേറ്റ്‌മെന്റ് സ്പെഷ്യൽ മോക്ക് ടെസ്റ്റ് 🔥</h4>
                <p className="text-xs text-slate-500">Multi-statement questions with authentic 4-option KPSC degree pattern</p>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-lg">50 Qs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
