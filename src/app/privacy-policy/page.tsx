import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Cookie, 
  Globe, 
  Mail, 
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kerala PSC Master (keralapsc.xyz)',
  description: 'Read the official Privacy Policy of PSC Master Kerala (keralapsc.xyz). Understand our data practices, zero-registration policy, cookie usage, Google AdSense & Analytics compliance, and user rights.',
  alternates: {
    canonical: 'https://www.keralapsc.xyz/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
        <span className="text-slate-900">Privacy Policy</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Official Compliance &amp; Data Protection
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            PSC Master Kerala (accessible at <span className="text-emerald-400 font-mono">https://www.keralapsc.xyz</span> and via our native Android app) is committed to protecting the privacy of competitive exam aspirants.
          </p>
          <div className="pt-2 text-xs text-slate-400 font-medium">
            Effective Date: January 1, 2024 &bull; Last Revised: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Highlights Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">No Mandatory Sign-Up</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Practice tests, mock exams, and 100,000+ questions are accessible without requiring phone numbers or passwords.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Device-Only Storage</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Active quiz progress, saved bookmarks, and custom filters remain safely on your personal device storage.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Transparent Cookies</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Standard Google AdSense &amp; Analytics cookies with full opt-out options via Google Ads Settings.
          </p>
        </div>
      </div>

      {/* Main Legal Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
            Introduction &amp; Scope
          </h2>
          <p>
            This Privacy Policy governs the manner in which <strong>PSC Master Kerala</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, maintains, and discloses information gathered from users (&quot;Aspirants&quot; or &quot;Users&quot;) of the website <Link href="/" className="text-emerald-700 font-semibold underline">https://www.keralapsc.xyz</Link> and associated mobile applications.
          </p>
          <p>
            By using our educational portal, mock test simulator, or reading daily current affairs capsules, you signify your acceptance of this policy. If you do not agree to this policy, please refrain from using our services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
            Information We Collect
          </h2>
          <p>
            We take a privacy-first approach. We collect minimal data necessary to maintain service speed, prevent fraudulent bot traffic, and provide educational utility:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Non-Personally Identifiable Information (Log Data):</strong> When you browse our portal, our web servers automatically log standard technical data transmitted by your browser, including your IP address, browser type, device brand/model, operating system, referring URL, pages visited, and timestamps.
            </li>
            <li>
              <strong>Local Browser &amp; App Storage:</strong> Your active quiz sessions, question bookmarks, preferred language mode, dark/light theme, and scorecard history are stored client-side via your browser’s <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">localStorage</code> or the Android app&apos;s encrypted preferences. This information never leaves your personal device.
            </li>
            <li>
              <strong>Voluntary Communications:</strong> If you contact our editorial team via email for feedback or error reporting, we retain your email address and message contents solely to respond to your inquiry.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
            Google AdSense &amp; Advertising Cookies
          </h2>
          <p>
            To keep our 100,000+ question bank and daily exam capsules completely free for all aspirants across Kerala, we display third-party advertisements delivered by <strong>Google AdSense</strong>.
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs sm:text-sm">
              <Cookie className="w-4 h-4 text-emerald-700" />
              DoubleClick DART Cookie Notice
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads to users based on their visit to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">Google Ad and Content Network Privacy Policy</a> or managing preferences at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">Google Ads Settings</a>.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">4</span>
            Google Analytics 4 (GA4)
          </h2>
          <p>
            We use Google Analytics 4 to understand website traffic patterns, popular question categories (such as Kerala Renaissance or Indian Polity), and server responsiveness. Google Analytics collects anonymized data such as approximate geographic location, session duration, and device category. No personally identifying information (PII) is linked to these metrics.
          </p>
          <p>
            You can prevent Google Analytics from recognizing you on return visits by disabling cookies in your browser or installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">Google Analytics Opt-out Browser Add-on</a>.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">5</span>
            PSC Thulasi Credentials &amp; Hall Tickets Safety
          </h2>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-amber-900">
              <span className="font-bold block">Strict Credential Protection Policy</span>
              <p>
                Our PSC Thulasi guide section is strictly educational. We do <strong>NOT</strong> host a login form for Kerala PSC Thulasi and we never ask for, collect, or store your KPSC User ID, Password, or OTPs. All official exam applications and hall ticket downloads occur strictly on the official Kerala Government portal at <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px] font-mono">thulasi.psc.kerala.gov.in</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">6</span>
            Data Security &amp; Protection
          </h2>
          <p>
            We implement industry-standard HTTPS encryption (TLS 1.3), Cloudflare security firewalls, and strict content security policies to protect all transmission between your device and our servers. Question databases are protected against unauthorized copying and injection attacks.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">7</span>
            Children&apos;s Privacy (COPPA &amp; DPDP Act Compliance)
          </h2>
          <p>
            Our services are designed for students and adults preparing for competitive public recruitment exams (typically ages 18 to 40). We do not knowingly collect personal data from individuals under 13 years of age.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">8</span>
            Grievance Officer &amp; Contact Information
          </h2>
          <p>
            In compliance with the Information Technology Act 2000 and Digital Personal Data Protection (DPDP) Act, if you have any questions or concerns regarding our privacy practices, please contact our designated Grievance Officer:
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-medium text-slate-800">
            <div><strong>Entity:</strong> PSC Master Kerala Editorial &amp; Tech Team</div>
            <div><strong>Email:</strong> <a href="mailto:privacy@keralapsc.xyz" className="text-emerald-700 underline">privacy@keralapsc.xyz</a></div>
            <div><strong>General Contact:</strong> <Link href="/contact" className="text-emerald-700 underline">Contact &amp; Support Desk</Link></div>
            <div><strong>Location:</strong> Thiruvananthapuram &amp; Kozhikode, Kerala, India</div>
          </div>
        </section>

      </div>
    </div>
  );
}
