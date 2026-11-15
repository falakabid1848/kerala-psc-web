import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, CheckCircle2, FileText, ArrowRight, Layers, Sparkles, GraduationCap, Award, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kerala PSC Syllabus 2026: Topic-wise Mark Distribution & Exam Pattern',
  description: 'Download latest Kerala PSC Syllabus 2026 for Degree Level Preliminary, LDC, Plus Two, and KAS. Topic-wise mark distribution, detailed module breakdown in Malayalam & English, and recommended practice tests.',
  keywords: [
    'kerala psc syllabus',
    'kerala psc syllabus 2026',
    'kerala psc degree level prelims syllabus',
    'ldc syllabus 2026',
    'kerala psc mark distribution',
    'kerala psc question paper pattern',
    'kerala psc renaissance syllabus',
    'kerala psc constitution syllabus',
    'kerala bank clerk syllabus',
    'kas syllabus 2026'
  ],
  alternates: {
    canonical: 'https://www.keralapsc.xyz/syllabus',
  },
};

export default function SyllabusPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the standard mark distribution for Kerala PSC Degree Level Preliminary Exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard 100-mark Kerala PSC exam is distributed as follows: History & Renaissance (10 marks), Geography (5 marks), Economics & Civics (5 marks), Indian Constitution (10 marks), General Science & Technology (10 marks), Current Affairs (15 marks), Simple Arithmetic & Mental Ability (20 marks), General English (10 marks), and Regional Language / Malayalam (10 marks), IT & Cyber Law (5 marks).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the negative marking policy in Kerala PSC exams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For each correct answer, 1 mark is awarded. For every wrong answer, 1/3 (0.33) marks are deducted. Unattempted questions carry zero deduction.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are statement type questions part of the Kerala PSC syllabus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, in recent Kerala PSC Degree Level and LDC examinations, over 30% to 50% of the questions are multi-statement analytical questions based on SCERT and NCERT textbooks.',
        },
      },
    ],
  };

  const syllabusModules = [
    {
      title: 'Indian Constitution & Civil Rights (ഇന്ത്യൻ ഭരണഘടന)',
      marks: '10 Marks',
      slug: 'constitution',
      topics: [
        'Preamble, Fundamental Rights, Fundamental Duties & Directive Principles',
        'Union Executive (President, Prime Minister, Council of Ministers)',
        'State Executive (Governor, Chief Minister, Cabinet)',
        'Judiciary: Supreme Court & High Courts, Judicial Review',
        'Constitutional & Statutory Bodies: Election Commission, UPSC, KPSC, CAG, Finance Commission',
        'Important Constitutional Amendments (42nd, 44th, 73rd, 74th, 86th, 101st-106th)',
        'Right to Information (RTI Act 2005), Lokpal & Lokayukta, Human Rights Commission'
      ]
    },
    {
      title: 'Kerala History & Renaissance (കേരള ചരിത്രവും നവോത്ഥാനവും)',
      marks: '10 Marks',
      slug: 'renaissance',
      topics: [
        'Early Kerala History: Cheras, Perumals, Kulasekharas, Sangam Era',
        'European Settlements: Portuguese, Dutch, British in Malabar & Travancore',
        'Anti-British Revolts: Pazhassi Raja, Velu Thampi Dalawa, Paliath Achan',
        'Kerala Renaissance Leaders: Sree Narayana Guru, Chattampi Swamikal, Ayyankali, Vaikunda Swamikal, Poykayil Yohannan, Vagbhatananda, Mannathu Padmanabhan',
        'Major Reform Movements: Temple Entry Proclamation (1936), Vaikom Satyagraha (1924), Guruvayur Satyagraha (1931), Channar Lahala',
        'Post-1956 Kerala: First EMS Ministry, Land Reforms, Aikya Kerala Movement'
      ]
    },
    {
      title: 'Geography of India & Kerala (ഭൂമിശാസ്ത്രം)',
      marks: '10 Marks',
      slug: 'geography',
      topics: [
        'Physiography: Highlands, Midlands, Lowlands; Western Ghats & Eastern Ghats',
        'River Systems: 44 Kerala Rivers (41 west-flowing, 3 east-flowing), Major Dams & Lakes',
        'Climate, Monsoons (Edavappathi & Thulavarsham), Soil types, Forest classifications',
        'National Parks, Wildlife Sanctuaries, Ramsar Wetland Sites & Biosphere Reserves in Kerala',
        'Transport & Communication: National Highways, Waterways, Airports & Seaports'
      ]
    },
    {
      title: 'General Science & Public Health (ശാസ്ത്രവും പൊതുജനാരോഗ്യവും)',
      marks: '10 Marks',
      slug: 'science',
      topics: [
        'Physics: Motion, Work, Energy, Power, Light, Reflection & Refraction, Sound, Electricity',
        'Chemistry: Atomic structure, Periodic Table, Acids, Bases & Salts, Carbon compounds',
        'Biology: Human Body & Organ Systems, Vitamins & Nutritional Deficiency Diseases',
        'Public Health, Communicable & Non-communicable diseases, Kerala Health Model',
        'Environmental Science, Ecology, Climate Change, Biodiversity conservation'
      ]
    },
    {
      title: 'Simple Arithmetic & Mental Ability (കണക്കും റീസണിങ്ങും)',
      marks: '20 Marks',
      slug: 'maths',
      topics: [
        'Number System, Fractions, Decimals, LCM & HCF',
        'Percentages, Profit & Loss, Simple Interest & Compound Interest',
        'Ratio & Proportion, Time & Work, Pipes & Cisterns',
        'Time, Speed & Distance, Problems on Trains, Boats & Streams',
        'Mental Ability: Number Series, Coding-Decoding, Blood Relations, Direction Sense, Syllogisms'
      ]
    },
    {
      title: 'Daily Current Affairs & Contemporary Issues (ആനുകാലികം)',
      marks: '15 Marks',
      slug: 'current-affairs',
      topics: [
        'National & International Summits, Treaties, Agreements and Bilateral Meets (2025–2026)',
        'Awards & Honors: Nobel Prizes, Bharat Ratna, Padma Awards, Jnanpith, Ezhuthachan Puraskaram',
        'Sports: Olympic Games, Cricket World Cup, FIFA, National Games, Chess Olympiad',
        'Science & Tech: ISRO Missions (Gaganyaan, Chandrayaan, Aditya-L1), AI Initiatives',
        'Kerala State Government Flagship Schemes, Budget Highlights & Infrastructure Projects'
      ]
    },
    {
      title: 'General English (ഇംഗ്ലീഷ് ഭാഷാപരിജ്ഞാനം)',
      marks: '10 Marks',
      slug: 'english',
      topics: [
        'Grammar: Tenses, Subject-Verb Agreement, Active & Passive Voice, Direct & Indirect Speech',
        'Parts of Speech, Prepositions, Conjunctions, Articles, Question Tags',
        'Vocabulary: Synonyms, Antonyms, Idioms & Phrases, One-word Substitutes, Phrasal Verbs',
        'Common Grammatical Errors & Sentence Correction'
      ]
    },
    {
      title: 'Malayalam Regional Language (മലയാളം ഭാഷാ സാഹിത്യം)',
      marks: '10 Marks',
      slug: 'malayalam',
      topics: [
        'പദശുദ്ധി, വാക്യശുദ്ധി, പരിഭാഷ (Vocabulary, Sentence structure & Correction)',
        'ശരിയായ പദം തിരഞ്ഞെടുക്കൽ, വിപരീത പദം, സമാന പദം, ഒറ്റപ്പദം',
        'ശൈലികളും പഴഞ്ചൊല്ലുകളും (Idioms & Proverbs in Malayalam)',
        'മലയാള സാഹിത്യം: പ്രധാന കൃതികൾ, എഴുത്തുകാർ, തൂലികാനാമങ്ങൾ, സാഹിത്യ അക്കാദമി അവാർഡുകൾ'
      ]
    },
  ];

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
          <span className="text-slate-900 font-semibold">Syllabus 2026</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 mb-4">
            Official Exam Pattern & Blueprint
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Kerala PSC Syllabus 2026: Topic-wise Mark Distribution & Exam Guide
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Comprehensive syllabus breakdown for Degree Level Preliminary, LDC, Plus Two, and KAS examinations. Study each module systematically with our curated 105,000+ question bank.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mock-test"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition active:scale-95 text-sm"
            >
              Take Syllabus-Based Mock Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/statement-questions"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl border border-white/20 transition text-sm"
            >
              Practice Statement Questions
            </Link>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
            <GraduationCap className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <span className="block text-xl font-extrabold text-slate-900">100 Marks</span>
            <span className="text-xs text-slate-500">Objective Pattern</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
            <Layers className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <span className="block text-xl font-extrabold text-slate-900">10 Modules</span>
            <span className="text-xs text-slate-500">Subject Coverage</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
            <Award className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <span className="block text-xl font-extrabold text-slate-900">-0.33</span>
            <span className="text-xs text-slate-500">Negative Marks</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
            <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="block text-xl font-extrabold text-slate-900">75 Mins</span>
            <span className="text-xs text-slate-500">Duration</span>
          </div>
        </div>

        {/* Syllabus Modules */}
        <div className="space-y-6 mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            Subject-wise Detailed Syllabus Breakdown
          </h2>

          {syllabusModules.map((mod, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:border-slate-300 transition">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{mod.title}</h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {mod.marks}
                </span>
              </div>
              <ul className="space-y-2 mb-4">
                {mod.topics.map((t, ti) => (
                  <li key={ti} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <Link
                  href={mod.slug === 'current-affairs' ? '/current-affairs' : `/quiz?category=${mod.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                >
                  Practice {mod.marks} Questions
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                How should I prepare for Kerala PSC statement-style questions?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Statement-type questions evaluate in-depth knowledge from SCERT Kerala class 5 to 10 textbooks. Focus on cause-and-effect relationships, key years, dates, constitutional articles, and notable historical milestones. Practice daily on our dedicated Statement Questions portal.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                Is the Kerala PSC syllabus revised for 2026?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes, Kerala PSC now emphasizes analytical problem solving, current national and international developments, environmental policies, and IT/Cyber security basics across all Degree Level and 10th Level exams.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold mb-2">Master the 2026 Kerala PSC Syllabus Today</h3>
          <p className="text-emerald-100 text-xs sm:text-sm mb-4 max-w-xl mx-auto">
            Test yourself with 105,000+ topic-wise questions, statement questions, and full-length 75-minute mock exams.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-white text-emerald-900 font-bold px-6 py-2.5 rounded-xl shadow transition hover:bg-emerald-50 text-sm"
          >
            Launch Free Question Bank
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
