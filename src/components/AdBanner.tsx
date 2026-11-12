'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Only attempt to push when client ID is configured and window.adsbygoogle is ready
    if (!adsenseClientId) return;

    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense ad push error:', err);
    }
  }, [adsenseClientId]);

  // If no AdSense ID is provided yet, show a clean, unobtrusive educational banner placeholder
  if (!adsenseClientId) {
    return (
      <aside
        aria-label="Sponsored Announcement"
        className={`my-4 p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-100/80 rounded-2xl text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-2xs ${className}`}
      >
        <div className="flex items-center gap-2 text-left">
          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
            PSC Free Prep
          </span>
          <span className="font-semibold text-slate-700 text-xs">
            100% Free Kerala PSC 2026 Preparation Portal &bull; Daily Current Affairs &amp; Mock Tests
          </span>
        </div>
        <span className="text-[10px] font-medium text-slate-400">
          Ad Space &bull; Google AdSense Partner
        </span>
      </aside>
    );
  }

  return (
    <div className={`my-4 flex justify-center overflow-hidden min-h-[90px] ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
