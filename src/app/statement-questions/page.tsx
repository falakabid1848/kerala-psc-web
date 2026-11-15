import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, CheckCircle2, ArrowRight, BookOpen, Flame, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kerala PSC Statement Questions: 55,000+ Multi-Statement Practice Bank with Keys',
  description: 'Practice 55,000+ authentic Kerala PSC statement-type questions in Malayalam script. Covers Renaissance, Polity, Geography, Science, and Literature with 4 options and detailed explanations.',
  keywords: [
    'kerala psc statement questions',
    'kerala psc statement type questions',
    'kerala psc malayalam statement questions',
    'psc statement questions with answer key',
    'degree level statement questions',
    'psc statement model questions 2026'
  ],
  alternates: {
    canonical: 'https://www.keralapsc.xyz/statement-questions',
  },
};

export default function StatementQuestionsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why are statement questions important in Kerala PSC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Since 2021, Kerala PSC has adopted UPSC-style multi-statement questions for Degree Level, KAS, and Secretariat Assistant exams to test in-depth analytical knowledge rather than rote memorization.',
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
          <span className="text-slate-900 font-semibold">Statement Questions</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-400/30 mb-4">
            🔥 High-Yield Degree Pattern
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Kerala PSC Statement Questions: 55,000+ Practice Repository
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Master the most critical section of modern Kerala PSC preliminary and mains exams. Practice authentic multi-statement questions across Renaissance, Constitution, Geography, Science, and Malayalam with detailed explanations.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/quiz?language=ml&type=statement&mode=practice&limit=25"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition active:scale-95 text-sm"
            >
              Start Malayalam Statements Practice
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quiz?language=en&type=statement&mode=practice&limit=25"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl border border-white/20 transition text-sm"
            >
              English Statements Drill
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              കേരള ചരിത്രവും നവോത്ഥാനവും
            </h3>
            <p className="text-xs text-slate-600 mb-3">ശ്രീനാരായണഗുരു, അയ്യങ്കാളി, ചട്ടമ്പിസ്വാമികൾ, ക്ഷേത്രപ്രവേശന വിളംബരം, വൈക്കം സത്യാഗ്രഹം.</p>
            <Link href="/quiz?category=Kerala History & Culture&type=statement" className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1">
              പ്രാക്ടീസ് ചെയ്യുക <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              ഇന്ത്യൻ ഭരണഘടനയും രാഷ്ട്രീയവും
            </h3>
            <p className="text-xs text-slate-600 mb-3">ആമുഖം, മൗലികാവകാശങ്ങൾ, റിട്ടുകൾ (Art 32 &amp; 226), DPSP, പാർലമെന്റ്, ഭരണഘടനാ ഭേദഗതികൾ.</p>
            <Link href="/quiz?category=Indian Polity & Constitution&type=statement" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              പ്രാക്ടീസ് ചെയ്യുക <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              കേരള ഭൂമിശാസ്ത്രം &amp; പരിസ്ഥിതി
            </h3>
            <p className="text-xs text-slate-600 mb-3">44 നദികൾ, പശ്ചിമഘട്ടം, ആനമുടി, ചുരങ്ങൾ, തടാകങ്ങൾ, സൈലന്റ് വാലി, ഇരവികുളം ദേശീയോദ്യാനം.</p>
            <Link href="/quiz?category=Geography of Kerala & India&type=statement" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              പ്രാക്ടീസ് ചെയ്യുക <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              മലയാള ഭാഷയും സാഹിത്യവും
            </h3>
            <p className="text-xs text-slate-600 mb-3">സന്ധി, സമാസം, വിഭക്തി, കവിത്രയം, നോവലുകൾ, ജ്ഞാനപീഠം, എഴുത്തച്ഛൻ പുരസ്കാര ജേതാക്കൾ.</p>
            <Link href="/quiz?category=Malayalam Language & Literature&type=statement" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              പ്രാക്ടീസ് ചെയ്യുക <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
