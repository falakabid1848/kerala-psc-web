'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Landmark, 
  Zap, 
  Calculator, 
  Clock, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Brain,
  Percent,
  Timer
} from 'lucide-react';

export default function BankingHubPage() {
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [showCalculator, setShowCalculator] = useState(false);

  const handleCalcBtn = (val: string) => {
    if (val === 'C') {
      setCalcDisplay('0');
    } else if (val === '=') {
      try {
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const result = Function(`'use strict'; return (${sanitized})`)();
        setCalcDisplay(String(result));
      } catch (err) {
        setCalcDisplay('Error');
      }
    } else {
      setCalcDisplay((prev) => (prev === '0' || prev === 'Error' ? val : prev + val));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
            <Landmark className="w-3.5 h-3.5" />
            Banking & Fast-Track Aptitude Speed Arena
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Kerala Bank & Mental Ability Speed Hub
          </h1>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-4">
            Practice TCS iON styled speed drills, Quantitative Aptitude shortcuts, Banking Awareness capsules, and test your problem-solving speed with our online exam simulator.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Speed Sprint Mode</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>TCS iON Virtual Calculator</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kerala Bank Syllabus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Speed Drills Grid */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Instant Speed Sprints (Timed Tests)</h2>
            <p className="text-xs text-slate-500">Pick a module below to start an interactive timed sprint.</p>
          </div>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition"
          >
            <Calculator className="w-3.5 h-3.5" />
            {showCalculator ? 'Close Calculator' : 'Open Exam Calculator'}
          </button>
        </div>

        {/* Floating / Embedded Calculator */}
        {showCalculator && (
          <div className="bg-slate-900 text-white p-4 rounded-2xl w-full sm:w-72 shadow-xl border border-slate-800 animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Exam Calculator</span>
              <button onClick={() => setShowCalculator(false)} className="text-xs text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="bg-slate-800 text-right p-3 rounded-lg text-lg font-mono mb-3 text-emerald-400 font-bold overflow-x-auto">
              {calcDisplay}
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-sm font-semibold">
              {['C', '/', '*', '-'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className="bg-indigo-600/80 hover:bg-indigo-600 p-3 rounded-xl text-center transition min-h-[44px]"
                >
                  {btn}
                </button>
              ))}
              {['7', '8', '9', '+'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className={`${btn === '+' ? 'bg-indigo-600/80' : 'bg-slate-800 hover:bg-slate-700'} p-3 rounded-xl text-center transition min-h-[44px]`}
                >
                  {btn}
                </button>
              ))}
              {['4', '5', '6', '='].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className={`${btn === '=' ? 'bg-emerald-600 row-span-2' : 'bg-slate-800 hover:bg-slate-700'} p-3 rounded-xl text-center transition min-h-[44px]`}
                >
                  {btn}
                </button>
              ))}
              {['1', '2', '3', '0'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className="bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-center transition min-h-[44px]"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Module 1: Quantitative Aptitude */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <Percent className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Quant Speed Test
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-2 mb-1">
                Quantitative Aptitude & Simplification
              </h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Profit & Loss, Compound Interest shortcuts, Time & Work formulas, and Train speed calculations.
              </p>
              <div className="text-xs text-slate-600 space-y-1 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-bold">20 Qs</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-bold">15 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Marking:</span>
                  <span className="font-bold text-emerald-600">+1 / -0.25</span>
                </div>
              </div>
            </div>

            <Link
              href="/quiz?category=Quantitative Aptitude & Mental Ability&mode=banking&limit=20"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition active:scale-98"
            >
              Start Quant Sprint
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 2: Banking & Financial Awareness */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Banking GK
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-2 mb-1">
                Banking & Economy Awareness
              </h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                RBI monetary policy, Repo rate, CASA ratio, Kerala Bank amalgamation, and digital banking (UPI/NEFT).
              </p>
              <div className="text-xs text-slate-600 space-y-1 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-bold">20 Qs</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-bold">10 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Marking:</span>
                  <span className="font-bold text-emerald-600">+1 / -0.33</span>
                </div>
              </div>
            </div>

            <Link
              href="/quiz?category=Banking & Financial Awareness&mode=banking&limit=20"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition active:scale-98"
            >
              Start Banking GK
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 3: Reasoning & Mental Ability */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                Logical Reasoning
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-2 mb-1">
                Reasoning & Syllogisms Sprint
              </h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Number series patterns, Syllogisms, Direction sense, and Blood relations puzzles.
              </p>
              <div className="text-xs text-slate-600 space-y-1 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-bold">20 Qs</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-bold">12 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Marking:</span>
                  <span className="font-bold text-emerald-600">+1 / -0.25</span>
                </div>
              </div>
            </div>

            <Link
              href="/quiz?category=Quantitative Aptitude & Mental Ability&mode=banking&limit=20"
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition active:scale-98"
            >
              Start Reasoning
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 4: General English Error Spotting */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                English Grammar
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-2 mb-1">
                English Vocabulary & Error Spotting
              </h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Subject-verb agreement, Prepositions, Conditional clauses, Idioms, and One-word substitutions.
              </p>
              <div className="text-xs text-slate-600 space-y-1 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-bold">20 Qs</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-bold">10 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Marking:</span>
                  <span className="font-bold text-emerald-600">+1 / -0.33</span>
                </div>
              </div>
            </div>

            <Link
              href="/quiz?category=General English&mode=banking&limit=20"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition active:scale-98"
            >
              Start English Test
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Speed Formula Quick Reference Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          High-Frequency Formula & Short Trick Sheet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h4 className="font-bold text-indigo-900 mb-1">1. Speed, Time & Distance</h4>
            <p className="text-slate-600 mb-1">km/h to m/s: multiply by <strong>5/18</strong>.</p>
            <p className="text-slate-600">m/s to km/h: multiply by <strong>18/5</strong>.</p>
            <p className="text-slate-600 mt-1 font-mono text-[11px] bg-white p-1 rounded border">Boat in still water = (Downstream + Upstream) / 2</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h4 className="font-bold text-indigo-900 mb-1">2. Combined Work Shortcut</h4>
            <p className="text-slate-600 mb-1">If A takes X days and B takes Y days:</p>
            <p className="text-slate-600 font-mono text-[11px] bg-white p-1 rounded border">Combined Days = (X × Y) / (X + Y)</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h4 className="font-bold text-indigo-900 mb-1">3. Difference between CI and SI</h4>
            <p className="text-slate-600 mb-1">For 2 years period:</p>
            <p className="text-slate-600 font-mono text-[11px] bg-white p-1 rounded border">Difference = P × (R / 100)²</p>
          </div>
        </div>
      </div>
    </div>
  );
}
