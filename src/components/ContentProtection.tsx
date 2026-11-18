'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function ContentProtection() {
  const [warning, setWarning] = useState<string | null>(null);

  const showWarning = (msg: string) => {
    setWarning(msg);
    setTimeout(() => {
      setWarning((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  useEffect(() => {
    // 0. Disable window.print globally
    if (typeof window !== 'undefined') {
      window.print = () => {
        showWarning('Printing and downloading questions as PDF is disabled.');
      };
    }

    // 1. Context Menu (Right Click) Block
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
      showWarning('Content Protected: Right-click and copying are disabled to protect test questions.');
    };

    // 2. Copy and Cut Event Block
    const handleCopyCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', 'Kerala PSC Master question bank content is protected.');
      }
      showWarning('Copying question text is prohibited to maintain examination integrity.');
    };

    // 3. Select Start Block
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
    };

    // 4. Drag Start Block
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
    };

    // 5. Keydown Shortcut Interceptor
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

      // Block Copy (Ctrl+C / Cmd+C) outside input
      if (isCmdOrCtrl && key === 'c' && !isInput) {
        e.preventDefault();
        showWarning('Copying question text is disabled.');
        return;
      }

      // Block Cut (Ctrl+X / Cmd+X) outside input
      if (isCmdOrCtrl && key === 'x' && !isInput) {
        e.preventDefault();
        return;
      }

      // Block Print (Ctrl+P / Cmd+P)
      if (isCmdOrCtrl && key === 'p') {
        e.preventDefault();
        showWarning('Printing and downloading questions as PDF is disabled.');
        return;
      }

      // Block Save Page (Ctrl+S / Cmd+S)
      if (isCmdOrCtrl && key === 's') {
        e.preventDefault();
        showWarning('Saving questions offline is disabled.');
        return;
      }

      // Block View Source (Ctrl+U / Cmd+U)
      if (isCmdOrCtrl && key === 'u') {
        e.preventDefault();
        showWarning('Viewing source code is disabled.');
        return;
      }

      // Block Developer Tools (F12, Ctrl+Shift+I / Cmd+Option+I, etc.)
      if (
        e.key === 'F12' ||
        (isCmdOrCtrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
      ) {
        e.preventDefault();
        showWarning('Developer inspection tools are disabled.');
        return;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!warning) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-slate-900/95 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl border border-rose-500/40 flex items-center gap-2.5 text-xs sm:text-sm font-medium">
        <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <span className="text-slate-100">{warning}</span>
      </div>
    </div>
  );
}
