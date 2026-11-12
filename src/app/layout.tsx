import type { Metadata, Viewport } from 'next';
import './globals.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#047857',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://keralapsc.xyz'),
  title: 'PSC Master Kerala | 11,400+ Kerala PSC & Banking Question Bank, Mock Tests & Notifications',
  description: 'The ultimate Kerala PSC and Banking exam preparation hub. 11,400+ statement-type & MCQ questions, live OMR & Banking mock exams, official upcoming PSC Thulasi notifications, and previous question papers (2020-2025) with answer keys.',
  keywords: [
    'Kerala PSC',
    'PSC Mock Test',
    'Kerala PSC 2024 2025 Questions',
    'Statement type questions Kerala PSC',
    'Kerala PSC Degree Level Prelims',
    'LDC Question Paper 2024 2025',
    'Kerala PSC Previous Question Papers with Answer Key',
    'PSC Thulasi Notifications 2024 2025',
    'Kerala Bank Clerk Exam',
    'KAS Prelims Paper',
    'Kerala Renaissance GK',
    'Secretariat Assistant Mock Test'
  ],
  authors: [{ name: 'PSC Master Kerala' }],
  openGraph: {
    title: 'PSC Master Kerala | 11,400+ Questions & Live Mock Tests',
    description: 'Master Kerala PSC & Banking Exams with 11,400+ authentic questions, statement-type challenges, OMR test simulator, and latest PSC notifications.',
    type: 'website',
    locale: 'en_IN'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'PSC Master Kerala',
    description: 'All-in-one preparation portal for Kerala Public Service Commission and Banking Examinations.',
    url: 'https://keralapsc.xyz',
    educationalCredentialAwarded: 'Kerala PSC & Banking Exam Mastery',
    hasPart: [
      {
        '@type': 'Quiz',
        name: 'Kerala PSC Statement & MCQ Practice Quiz',
        about: 'Kerala Renaissance, Constitution, Geography, Science, and Mental Ability'
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white pb-20 md:pb-0">
        {/* Navigation Bar with Mobile Drawer and Bottom Nav */}
        <Navbar />

        {/* Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-12 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 text-white font-bold text-lg mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-base">
                    PSC
                  </div>
                  <span>PSC Master Kerala</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  India’s premier mobile-optimized preparation portal for Kerala PSC (Degree Level, LDC, Secretariat Assistant, KAS) and Kerala Bank recruitment exams with 11,400+ statement & MCQ questions.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Question Database: 11,400 Verified Qs
                </div>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Question Categories</h4>
                <ul className="space-y-1.5 text-xs">
                  <li><Link href="/?category=Kerala History & Culture" className="hover:text-emerald-400 transition">Kerala History & Renaissance</Link></li>
                  <li><Link href="/?category=Indian Polity & Constitution" className="hover:text-emerald-400 transition">Indian Polity & Constitution</Link></li>
                  <li><Link href="/?category=Geography of Kerala & India" className="hover:text-emerald-400 transition">Geography of Kerala & India</Link></li>
                  <li><Link href="/?category=Quantitative Aptitude & Mental Ability" className="hover:text-emerald-400 transition">Maths & Mental Ability (PSC/Banking)</Link></li>
                  <li><Link href="/?category=Malayalam Language & Literature" className="hover:text-emerald-400 transition">മലയാള ഭാഷയും സാഹിത്യവും</Link></li>
                  <li><Link href="/?category=Banking & Financial Awareness" className="hover:text-emerald-400 transition">Banking & Financial Awareness</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Exam Resources</h4>
                <ul className="space-y-1.5 text-xs">
                  <li><Link href="/current-affairs" className="text-amber-300 font-semibold hover:text-white transition">Daily Current Affairs (2025) 🔥</Link></li>
                  <li><Link href="/notifications" className="hover:text-emerald-400 transition">Official PSC Exam Notifications (2024-25)</Link></li>
                  <li><Link href="/previous-papers" className="hover:text-emerald-400 transition">Previous Question Papers (2020-2025)</Link></li>
                  <li><Link href="/quiz?mode=exam" className="hover:text-emerald-400 transition">100-Mark OMR Simulator Mode</Link></li>
                  <li><Link href="/banking" className="hover:text-emerald-400 transition">Banking TCS-iON Speed Drills</Link></li>
                  <li><Link href="/bookmarks" className="hover:text-emerald-400 transition">Tricky Statements Revision Deck</Link></li>
                  <li><Link href="/analytics" className="hover:text-emerald-400 transition">Negative Marking Scorecard</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Exam Pattern & Rules</h4>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Marks:</span>
                    <span className="text-white font-bold">100 Marks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Exam Duration:</span>
                    <span className="text-white font-bold">75 Minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Correct Answer:</span>
                    <span className="text-emerald-400 font-bold">+1.00 Mark</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Negative Marking:</span>
                    <span className="text-rose-400 font-bold">-0.33 Mark</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-3">
                  Disclaimer: This is an independent educational prep platform and is not officially affiliated with Kerala Public Service Commission (KPSC).
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
              <p>© 2024-2025 PSC Master Kerala. Dedicated to Kerala PSC & Banking Aspirants.</p>
              <p className="mt-2 sm:mt-0 font-medium">Mobile-Optimized with Next.js, Tailwind CSS & High-Performance In-Memory DB</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
