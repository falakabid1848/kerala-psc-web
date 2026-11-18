'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  ArrowLeft,
  FileQuestion,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Question Correction',
    questionCode: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-emerald-700 transition flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900">Contact Us</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            Support Desk &amp; Grievance Redressal
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Contact Kerala PSC Master
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Have a question, feedback, or identified an erratum in our statement question bank or answer keys? Our academic and technical teams are here to assist.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <FileQuestion className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Question Corrections</h3>
            <p className="text-slate-500 text-xs mt-1">Report answer key disputes or typos</p>
          </div>
          <a 
            href="mailto:questions@keralapsc.xyz" 
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 break-all inline-block underline"
          >
            questions@keralapsc.xyz
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Android App &amp; Tech</h3>
            <p className="text-slate-500 text-xs mt-1">Crash reports, feature requests &amp; sync</p>
          </div>
          <a 
            href="mailto:app-support@keralapsc.xyz" 
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 break-all inline-block underline"
          >
            app-support@keralapsc.xyz
          </a>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Grievance Officer</h3>
            <p className="text-slate-500 text-xs mt-1">DPDP Act, DMCA &amp; legal compliance</p>
          </div>
          <a 
            href="mailto:grievance@keralapsc.xyz" 
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 break-all inline-block underline"
          >
            grievance@keralapsc.xyz
          </a>
        </div>
      </div>

      {/* Main Feedback Form & Location */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="space-y-1 mb-6">
            <h2 className="text-lg font-bold text-slate-900">Send Direct Feedback / Correction</h2>
            <p className="text-xs text-slate-500">We respond to verified syllabus corrections within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-950">Thank You for Your Feedback!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Your message has been received. Our editorial team will review the details against the official Kerala PSC Gazette and respond if required.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-emerald-700 underline pt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Nair"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@example.com"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Query Category</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Question Correction">Question Correction / Erratum</option>
                    <option value="Previous Paper Key">Previous Year Paper Key Discrepancy</option>
                    <option value="Android App Support">Android Native App Support</option>
                    <option value="Content Copyright">Copyright / Licensing Query</option>
                    <option value="General Feedback">General Suggestion &amp; Feedback</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Question Code / Exam ID (Optional)</label>
                  <input
                    type="text"
                    value={formData.questionCode}
                    onChange={(e) => setFormData({ ...formData, questionCode: e.target.value })}
                    placeholder="e.g. 057/2024 or Q #14"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Message Details</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe the question, question text, or feedback in detail..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback to Editorial Board</span>
              </button>
            </form>
          )}
        </div>

        {/* Side Info Box */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Editorial Desk Locations
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              PSC Master Kerala editorial operations are distributed across Kerala with volunteer academic reviewers in Thiruvananthapuram, Kochi, and Kozhikode.
            </p>
            <div className="text-xs space-y-2 border-t border-slate-800 pt-3">
              <div className="text-slate-400">Head Editorial Hub:</div>
              <div className="font-semibold text-slate-200">
                Thiruvananthapuram, Kerala, 695001
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 text-xs text-slate-600">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              Frequently Asked Legal Question
            </div>
            <p>
              <strong>Can I copy questions for my coaching institute test?</strong><br />
              Commercial reproduction of our compiled statement question database without prior written consent is strictly prohibited under our <Link href="/terms" className="text-blue-700 underline font-semibold">Terms &amp; Conditions</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
