import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  Scale, 
  ArrowLeft,
  Ban,
  Clock,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Kerala PSC Master (keralapsc.xyz)',
  description: 'Official Terms of Service and Conditions for Kerala PSC Master (keralapsc.xyz). Review terms covering proprietary question bank copyright, anti-copying rules, acceptable use, and disclaimer.',
  alternates: {
    canonical: 'https://www.keralapsc.xyz/terms',
  },
};

export default function TermsPage() {
  const lastUpdated = 'November 15, 2026';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-emerald-700 transition flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900">Terms &amp; Conditions</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Scale className="w-4 h-4 text-blue-400" />
            User Agreement &amp; Platform Guidelines
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Please read these terms and conditions carefully before using the Kerala PSC Master website (<span className="text-blue-300 font-mono">keralapsc.xyz</span>) or native Android application.
          </p>
          <div className="pt-2 text-xs text-slate-400 font-medium">
            Effective Date: January 1, 2024 &bull; Last Revised: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Warning Box for Content Protection */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 flex items-start gap-3.5 shadow-2xs">
        <Ban className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-amber-900">
          <h3 className="font-bold text-sm text-amber-950">Strict Prohibition on Question Scraping &amp; Unauthorized Copying</h3>
          <p className="leading-relaxed">
            Our 100,000+ Malayalam statement question bank, categorized module indexes, and mock test datasets are protected by intellectual compilation rights. Automated web scraping, bulk downloading, commercial reproduction, or attempting to circumvent client-side copy prevention tools is strictly prohibited and subject to legal action.
          </p>
        </div>
      </div>

      {/* Main Legal Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
            Acceptance of Terms
          </h2>
          <p>
            By accessing, browsing, or utilizing <strong>PSC Master Kerala</strong> (&quot;the Platform&quot;, &quot;keralapsc.xyz&quot;, or &quot;the App&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, you are prohibited from accessing the platform.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
            Intellectual Property &amp; Content Ownership
          </h2>
          <p>
            All original pedagogical content on this website, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Curated Malayalam statement-type practice questions and option sets;</li>
            <li>Detailed answer explanations, memory tricks, and syllabus breakdowns;</li>
            <li>Daily current affairs editorial capsules and topic taggings;</li>
            <li>User interface layouts, OMR simulation algorithms, and proprietary ranking scripts;</li>
          </ul>
          <p>
            are the exclusive intellectual property of PSC Master Kerala. You are granted a limited, personal, non-transferable, and revocable license to access the content solely for private, non-commercial exam self-study.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
            Acceptable Use Policy
          </h2>
          <p>
            When using our platform, you agree that you will <strong>NOT</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Use automated scrapers, spiders, robots, crawlers, or data-mining tools to extract questions, answer keys, or user data;</li>
            <li>Decompile, reverse-engineer, disassemble, or tamper with the web application or native Android APK;</li>
            <li>Bypass or attempt to disable the client-side copy protection, right-click shields, or rate-limiting firewalls;</li>
            <li>Republish, sell, rent, sub-license, or redistribute our question bank into competing commercial test portals, offline guides, or paid Telegram channels without written consent;</li>
            <li>Engage in Distributed Denial of Service (DDoS) attacks or transmit malicious viruses, trojans, or worms.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">4</span>
            Mock Tests &amp; Scoring Accuracy
          </h2>
          <p>
            Our 75-minute mock tests and negative marking calculator (-0.33 per incorrect answer) are educational simulations calibrated to mirror real Kerala Public Service Commission (KPSC) conditions.
          </p>
          <p>
            While our editorial board strives for 100% accuracy in provisional and final answer keys, official Kerala PSC gazette publications and final KPSC revised keys always prevail. PSC Master Kerala shall not be held liable for discrepancies between mock scores and actual public commission exam outcomes.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">5</span>
            No Government Affiliation
          </h2>
          <p>
            PSC Master Kerala is an independent educational platform. We are <strong>not</strong> affiliated with, operated by, or endorsed by the Kerala Public Service Commission (KPSC), the Government of Kerala, or any state or central recruitment agency. Official notifications must always be confirmed at <a href="https://keralapsc.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-semibold">keralapsc.gov.in</a>.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">6</span>
            Disclaimer of Warranties &amp; Limitation of Liability
          </h2>
          <p>
            The services, questions, tests, and current affairs are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. PSC Master Kerala expressly disclaims all implied warranties of merchantability, fitness for a particular examination, or uninterrupted website availability.
          </p>
          <p>
            In no event shall PSC Master Kerala or its developers be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from the use or inability to use the platform.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">7</span>
            Governing Law &amp; Jurisdiction
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising out of or related to the platform shall be subject to the exclusive jurisdiction of the competent courts in Kerala, India.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">8</span>
            Contact Regarding Terms
          </h2>
          <p>
            If you have questions about these Terms and Conditions or wish to request licensing permissions, please contact our legal desk at <a href="mailto:legal@keralapsc.xyz" className="text-blue-700 underline font-medium">legal@keralapsc.xyz</a> or visit our <Link href="/contact" className="text-blue-700 underline font-medium">Contact Page</Link>.
          </p>
        </section>

      </div>
    </div>
  );
}
