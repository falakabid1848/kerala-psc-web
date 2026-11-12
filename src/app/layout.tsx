import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#047857',
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-6FPEX6MZ07';
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-8633936066750748';
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-token';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.keralapsc.xyz'),
  title: {
    default: 'Kerala PSC 2026: 11,400+ Free Question Bank, Mock Tests & Previous Papers | PSC Master',
    template: '%s | Kerala PSC Master',
  },
  description: 'Top Kerala PSC preparation portal (keralapsc.xyz). 11,400+ free Kerala PSC statement questions, daily 2026 current affairs, official previous question papers (2020-2025) with answer keys, PSC Thulasi exam notifications, and live 75-min OMR mock tests for Degree Level, LDC, KAS, and Kerala Bank.',
  keywords: [
    'Kerala PSC',
    'kerala psc',
    'kerala psc thulasi',
    'kerala psc question bank',
    'kerala psc mock test',
    'kerala psc previous question papers',
    'kerala psc current affairs 2026',
    'kerala psc online test',
    'kerala psc repeated questions',
    'kerala psc answer key',
    'ldc question paper 2024 2025',
    'kerala psc degree level prelims',
    'kerala psc syllabus 2026',
    'kerala psc exam calendar',
    'kerala bank clerk question paper',
    'kerala renaissance gk questions',
    'kas exam question paper',
    'kerala psc statement questions',
    'psc thulasi login',
    'psc bulletin online',
    'കേരള പിഎസ്സി ചോദ്യങ്ങൾ',
    'കേരള പിഎസ്സി മുൻവർഷ ചോദ്യങ്ങൾ'
  ],
  alternates: {
    canonical: 'https://www.keralapsc.xyz',
  },
  authors: [{ name: 'PSC Master Kerala', url: 'https://www.keralapsc.xyz' }],
  creator: 'PSC Master Kerala',
  publisher: 'PSC Master Kerala',
  applicationName: 'PSC Master Kerala',
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: GOOGLE_VERIFICATION,
  },
  openGraph: {
    title: 'Kerala PSC 2026: 11,400+ Free Questions, Live Mock Tests & Answer Keys',
    description: 'Master Kerala PSC exams with 11,400+ statement questions, official previous papers, live 75-min OMR mock tests, and 2026 daily current affairs.',
    url: 'https://www.keralapsc.xyz',
    siteName: 'Kerala PSC Master',
    images: [
      {
        url: 'https://www.keralapsc.xyz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kerala PSC Master - 11,400+ Questions and Live Mock Tests',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala PSC 2026: 11,400+ Questions & Live Mock Tests',
    description: 'Practice Kerala PSC statement questions, 2020-2025 previous papers with keys, and 2026 daily current affairs capsules.',
    images: ['https://www.keralapsc.xyz/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Rich Structured Data (JSON-LD) for Google SERP Rich Snippets & Sitelinks
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kerala PSC Master',
    alternateName: ['Kerala PSC Quiz', 'Kerala PSC Question Bank', 'keralapsc.xyz', 'PSC Master'],
    url: 'https://www.keralapsc.xyz',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.keralapsc.xyz/?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'PSC Master Kerala',
    url: 'https://www.keralapsc.xyz',
    description: 'India premier free preparation portal for Kerala Public Service Commission (KPSC) and Kerala Bank examinations with 11,400+ verified statement & MCQ questions.',
    sameAs: [
      'https://www.keralapsc.xyz',
      'https://keralapsc.xyz',
    ],
    hasPart: [
      {
        '@type': 'Quiz',
        name: 'Kerala PSC Statement & MCQ Practice Quiz',
        about: 'Kerala Renaissance, Constitution, Geography, Science, and Mental Ability',
      },
      {
        '@type': 'Course',
        name: 'Kerala PSC 2026 Daily Current Affairs & Exam Capsule',
        description: 'Comprehensive daily current affairs with Malayalam notes and PSC test cards.',
        provider: {
          '@type': 'Organization',
          name: 'PSC Master Kerala',
        },
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best platform to practice Kerala PSC questions for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'keralapsc.xyz is the leading free platform featuring over 11,400 verified Kerala PSC statement-type questions, 21 previous question papers (2020-2025) with answer keys, 2026 daily current affairs, and timed 75-minute OMR mock tests.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I download Kerala PSC previous question papers with official answer keys?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can practice and print 21 full official Kerala PSC previous question papers from 2020 to 2025 (Degree Level Prelims, LDC, Secretariat Assistant, and KAS) along with official provisional and final answer keys at https://www.keralapsc.xyz/previous-papers.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the marking scheme and negative marking in Kerala PSC exams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kerala PSC exams consist of 100 questions for 100 marks with a duration of 75 minutes. For each correct answer, candidates get +1.00 mark. For each incorrect answer, 0.33 marks (1/3rd) are deducted as negative marking.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I read Kerala PSC daily current affairs 2026 in Malayalam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Daily current affairs from January 2026 to November 2026 are updated with Malayalam headlines, key bullet points, and expected PSC practice questions at https://www.keralapsc.xyz/current-affairs.',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Google Site Verification Meta Tag */}
        <meta name="google-site-verification" content={GOOGLE_VERIFICATION} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white pb-20 md:pb-0">
        {/* Google Analytics 4 (gtag.js) */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Google AdSense Script */}
        {ADSENSE_CLIENT_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}

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
                  India’s premier mobile-optimized preparation portal for Kerala PSC (Degree Level, LDC, Secretariat Assistant, KAS) and Kerala Bank recruitment exams with 11,400+ statement &amp; MCQ questions.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Question Database: 11,400 Verified Qs
                </div>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Kerala PSC Subjects</h4>
                <ul className="space-y-1.5 text-xs">
                  <li><Link href="/?category=Kerala History & Culture" className="hover:text-emerald-400 transition">Kerala History &amp; Renaissance</Link></li>
                  <li><Link href="/?category=Indian Polity & Constitution" className="hover:text-emerald-400 transition">Indian Polity &amp; Constitution</Link></li>
                  <li><Link href="/?category=Geography of Kerala & India" className="hover:text-emerald-400 transition">Geography of Kerala &amp; India</Link></li>
                  <li><Link href="/?category=Quantitative Aptitude & Mental Ability" className="hover:text-emerald-400 transition">Maths &amp; Mental Ability (PSC/Banking)</Link></li>
                  <li><Link href="/?category=Malayalam Language & Literature" className="hover:text-emerald-400 transition">മലയാള ഭാഷയും സാഹിത്യവും</Link></li>
                  <li><Link href="/?category=Banking & Financial Awareness" className="hover:text-emerald-400 transition">Banking &amp; Financial Awareness</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Kerala PSC Resources</h4>
                <ul className="space-y-1.5 text-xs">
                  <li><Link href="/current-affairs" className="text-amber-300 font-semibold hover:text-white transition">Daily Current Affairs (2026) 🔥</Link></li>
                  <li><Link href="/notifications" className="hover:text-emerald-400 transition">Official PSC Exam Notifications (2025-26)</Link></li>
                  <li><Link href="/previous-papers" className="hover:text-emerald-400 transition">Previous Question Papers (2020-2025)</Link></li>
                  <li><Link href="/quiz?mode=exam" className="hover:text-emerald-400 transition">100-Mark OMR Simulator Mode</Link></li>
                  <li><Link href="/banking" className="hover:text-emerald-400 transition">Banking TCS-iON Speed Drills</Link></li>
                  <li><Link href="/bookmarks" className="hover:text-emerald-400 transition">Tricky Statements Revision Deck</Link></li>
                  <li><Link href="/analytics" className="hover:text-emerald-400 transition">Negative Marking Scorecard</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Kerala PSC Exam Rules</h4>
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
              <p>© 2024-2026 PSC Master Kerala (keralapsc.xyz). Dedicated to Kerala PSC &amp; Banking Aspirants.</p>
              <p className="mt-2 sm:mt-0 font-medium">SEO Optimized &bull; Mobile-First &bull; High Speed</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
