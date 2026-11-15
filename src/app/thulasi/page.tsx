import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, CheckCircle2, AlertCircle, FileText, Smartphone, Key, UserCheck, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PSC Thulasi Login 2026: OTR Registration, Profile Login & Hall Ticket Download',
  description: 'Complete guide for Kerala PSC Thulasi Login (thulasi.psc.kerala.gov.in). Step-by-step instructions for One Time Registration (OTR), user ID & password recovery, mobile confirmation, and hall ticket download.',
  keywords: [
    'psc thulasi login',
    'kerala psc thulasi',
    'thulasi psc kerala gov in login',
    'psc one time registration',
    'kerala psc profile login',
    'psc hall ticket download',
    'kerala psc forgotten user id password',
    'psc confirmation 2026'
  ],
  alternates: {
    canonical: 'https://www.keralapsc.xyz/thulasi',
  },
};

export default function PscThulasiPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How to login to Kerala PSC Thulasi profile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit official portal thulasi.psc.kerala.gov.in, enter your registered User ID, Password, and Captcha code, then click Log In. Once inside, you can check notifications, submit confirmation, and download admission tickets.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to recover forgotten Kerala PSC Thulasi User ID or Password?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To recover User ID, send SMS: KL USRID to 166 or 51969 or 9223166166 from your registered mobile number. To reset password, send SMS: KL USRPWD <UserID> <DateOfBirthDDMMYYYY> to 166.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Kerala PSC confirmation and how to submit it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Confirmation is a mandatory declaration by applicants that they will attend the exam. Login to your Thulasi profile, click Confirmation for Examination, choose your exam language and district, and submit before the deadline.',
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
          <span className="text-slate-900 font-semibold">PSC Thulasi Guide 2026</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-4">
            Official Portal Guide 2026
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Kerala PSC Thulasi Login &amp; One Time Registration (OTR) 2026
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Comprehensive guide for Kerala Public Service Commission (KPSC) candidates. Learn how to log in, recover user IDs/passwords via SMS, submit exam confirmation, and download hall tickets.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://thulasi.psc.kerala.gov.in/thulasi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg transition active:scale-95 text-sm"
            >
              Open Official Thulasi Portal
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/quiz?mode=exam"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl border border-white/20 transition text-sm"
            >
              Practice 100-Mark OMR Mock Test
            </Link>
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Forgot User ID?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Send SMS <strong className="text-slate-900">KL USRID</strong> to <strong className="text-slate-900">166</strong> or <strong className="text-slate-900">51969</strong> from registered mobile number.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Reset Password?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              SMS <strong className="text-slate-900">KL USRPWD &lt;UserID&gt; &lt;DOB-DDMMYYYY&gt;</strong> to <strong className="text-slate-900">166</strong>.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Exam Confirmation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit confirmation within the specified window to generate admission ticket.
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs mb-10 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Step-by-Step Guide: One Time Registration (OTR)
          </h2>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">1</span>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">Visit the Thulasi Website</h4>
                <p className="text-xs text-slate-600">Navigate to <code>thulasi.psc.kerala.gov.in</code> on any modern browser.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">2</span>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">Click 'New Registration'</h4>
                <p className="text-xs text-slate-600">Enter personal details as per SSLC certificate (Name, DOB, Gender, Father's Name, Mother's Name, Caste, Religion).</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">3</span>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">Upload Photo &amp; Signature</h4>
                <p className="text-xs text-slate-600">Photo must be passport size with white background and candidate name + date of photo taken imprinted. Max size 30 KB.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">4</span>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">Aadhaar Verification</h4>
                <p className="text-xs text-slate-600">Link your 12-digit Aadhaar number for seamless identity validation and OTP verification.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
          <h3 className="font-bold text-emerald-900 text-base sm:text-lg">
            Ready to test your preparation for upcoming exams?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-700 max-w-xl mx-auto">
            Practice over 100,000+ authentic Kerala PSC statement and MCQ questions with live scorecards and negative marking on PSC Master!
          </p>
          <div className="pt-2">
            <Link
              href="/quiz?language=ml&type=statement&mode=practice"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-sm"
            >
              Start Free PSC Practice Now 🔥
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
