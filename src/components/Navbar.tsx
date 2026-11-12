'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Sparkles, 
  Bell, 
  FileText, 
  Landmark, 
  Bookmark, 
  BarChart3, 
  Menu, 
  X, 
  ChevronRight,
  Zap,
  Home,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Question Bank', icon: BookOpen, badge: '11.4K' },
    { href: '/quiz', label: 'Live Mock / OMR', icon: Sparkles, badge: 'New', highlight: true },
    { href: '/notifications', label: 'Exam Notifications', icon: Bell, badge: '2024-25' },
    { href: '/previous-papers', label: 'Previous Papers', icon: FileText, badge: '2020-25' },
    { href: '/banking', label: 'Banking & Speed', icon: Landmark },
    { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const bottomNavItems = [
    { href: '/', label: 'Questions', icon: Home },
    { href: '/quiz', label: 'Mock Test', icon: Sparkles, highlight: true },
    { href: '/notifications', label: 'Exams', icon: Bell, badge: 'New' },
    { href: '/previous-papers', label: 'Papers', icon: FileText },
    { href: '/banking', label: 'Banking', icon: Landmark },
  ];

  return (
    <>
      {/* Top Banner (Compact on mobile) */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 font-medium flex items-center justify-between sm:justify-center gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-400 text-slate-950 uppercase shrink-0">
            2024-2025
          </span>
          <span className="truncate">
            Kerala PSC Degree Level Prelims & LDC Papers Added! 11,400+ Qs.
          </span>
        </div>
        <Link 
          href="/notifications" 
          className="underline font-bold text-amber-300 hover:text-white shrink-0 ml-1"
        >
          Notifications &rarr;
        </Link>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-15 sm:h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform">
                PSC
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-lg tracking-tight flex items-center gap-1.5">
                  PSC Master
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                    11.4K Qs
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium kerala-font leading-none hidden sm:block">
                  കേരള PSC & ബാങ്കിങ് പരീക്ഷാ സഹായി
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 ${
                      item.highlight
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        : isActive
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${item.highlight ? 'text-white' : isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                    {item.badge && !item.highlight && (
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Header Right Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                href="/quiz"
                className="px-2.5 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg shadow-xs flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Test</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto p-5 z-10 animate-in slide-in-from-right duration-200">
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    PSC
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">PSC Master Kerala</h3>
                    <p className="text-[10px] text-slate-500">11,400+ Verified Questions</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                        item.highlight
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : isActive
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${item.highlight ? 'text-white' : 'text-emerald-600'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          item.highlight ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Quick Exam Calendar Alert Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    Latest PSC Exams (2024-25)
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Degree Level Prelims, LDC, KAS, and Secretariat Assistant dates announced.
                </p>
                <Link
                  href="/notifications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 pt-1"
                >
                  View full schedule <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
              PSC Master Kerala &bull; 11,400+ Free Questions
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Navigation Bar (app-like experience for phones) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-2 py-1 flex items-center justify-around">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition min-w-[54px] ${
                item.highlight
                  ? 'text-emerald-700 font-extrabold'
                  : isActive
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <div className={`p-1 rounded-xl transition ${
                  item.highlight
                    ? 'bg-emerald-100 text-emerald-700 shadow-2xs'
                    : isActive
                    ? 'bg-emerald-50 text-emerald-600'
                    : ''
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </div>
              <span className="text-[9px] tracking-tight mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
