import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ExternalLink, 
  ShieldAlert, 
  FileCheck2, 
  Info, 
  ArrowLeft,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer & Government Non-Affiliation | Kerala PSC Master',
  description: 'Official Government Non-Affiliation Disclaimer for PSC Master Kerala (keralapsc.xyz). Read our independent educational platform notice regarding KPSC exams, answer keys, and Thulasi.',
  alternates: {
    canonical: 'https://www.keralapsc.xyz/disclaimer',
  },
};

export default function DisclaimerPage() {
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
        <span className="text-slate-900">Disclaimer</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Independent Educational Initiative
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Government Non-Affiliation Disclaimer
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            PSC Master Kerala (<span className="text-amber-300 font-mono">keralapsc.xyz</span>) is a privately managed online preparation platform dedicated to helping aspirants prepare for competitive recruitment examinations.
          </p>
          <div className="pt-2 text-xs text-slate-400 font-medium">
            Last Verified: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Major Callout Box */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-rose-950">
              Not Affiliated with Kerala Public Service Commission (KPSC)
            </h2>
            <p className="text-xs text-rose-800">Please read this important notice before utilizing our study materials.</p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-rose-900 space-y-2.5 leading-relaxed">
          <p>
            <strong>PSC Master Kerala (keralapsc.xyz)</strong> is strictly an <strong>independent, unofficial educational resource</strong>. We are <strong>NOT</strong> associated, affiliated, endorsed, authorized, or in any way officially connected with the:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium">
            <li>Kerala Public Service Commission (KPSC)</li>
            <li>Government of Kerala</li>
            <li>Kerala State Co-operative Bank (Kerala Bank)</li>
            <li>Any departmental recruitment boards or government agencies</li>
          </ul>
          <p>
            The official website of the Kerala Public Service Commission is accessible exclusively at{' '}
            <a 
              href="https://www.keralapsc.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold underline text-rose-950 inline-flex items-center gap-1 hover:text-rose-700"
            >
              https://www.keralapsc.gov.in <ExternalLink className="w-3 h-3 inline" />
            </a>
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
            Purpose of the Website &amp; App
          </h2>
          <p>
            The quizzes, 100-mark OMR mock tests, statement questions, syllabus modules, and daily current affairs published on keralapsc.xyz and our native Android app are compiled solely for <strong>educational, informational, and self-assessment purposes</strong>.
          </p>
          <p>
            Our objective is to provide a modern, mobile-optimized practice environment to help job aspirants master the Kerala PSC negative marking format (-0.33) and statement questions.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
            Accuracy of Questions &amp; Answer Keys
          </h2>
          <p>
            Our academic contributors meticulously cross-reference questions with previous question papers released by the Kerala PSC, PSC Bulletins, Kerala Gazette notifications, and standard university textbooks.
          </p>
          <p>
            However, inadvertent typographical errors, translation differences (between Malayalam and English), or post-examination commission errata may occur. We strongly advise all candidates to verify final answers, deleted questions, and revised answer keys on the official KPSC portal prior to attending examinations.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
            Exam Dates, Notifications &amp; Cut-Offs
          </h2>
          <p>
            Examination schedules, qualification requirements, age limits, vacancy numbers, and expected cut-offs provided in our syllabus and notifications sections are for reference only. 
          </p>
          <p>
            Candidates must always rely on the official notification issued in the <strong>Kerala PSC Bulletin</strong> or published under the &quot;Notifications&quot; tab of the official website for legal eligibility determination.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">4</span>
            PSC Thulasi Account Security
          </h2>
          <p>
            We provide informational guides on how to navigate the official PSC Thulasi One Time Registration (OTR) system (e.g., password recovery via SMS, photo specification requirements, exam confirmation steps).
          </p>
          <p>
            <strong>We will NEVER ask for, nor should you ever enter your Thulasi User ID or Password on any unofficial website.</strong> Always ensure your browser address bar displays <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">thulasi.psc.kerala.gov.in</code> before logging into your profile.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">5</span>
            External Links &amp; Third-Party Resources
          </h2>
          <p>
            Our website contains outbound links to official portals (such as <a href="https://keralapsc.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">keralapsc.gov.in</a>, <a href="https://kerala.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">kerala.gov.in</a>), government gazette PDFs, and educational reference archives. We have no control over the content, uptime, or privacy policies of these external websites.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">6</span>
            Reporting Discrepancies &amp; Corrections
          </h2>
          <p>
            If you identify any factual error in a question, incorrect option marking, or outdated notification detail, please notify our editorial board so we can verify and update it immediately for fellow aspirants.
          </p>
          <div className="pt-1">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Info className="w-4 h-4 text-amber-400" />
              <span>Submit Question Feedback / Correction</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
