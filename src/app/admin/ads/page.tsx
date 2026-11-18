'use client';

import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  ShieldCheck, 
  Smartphone, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  Eye, 
  PlayCircle,
  Layout,
  ExternalLink
} from 'lucide-react';

interface AdConfig {
  adsEnabled: boolean;
  admobAppId: string;
  bannerAdUnitId: string;
  nativeAdUnitId: string;
  interstitialAdUnitId: string;
  rewardedVideoAdUnitId: string;
  showHomeNativeAd: boolean;
  showQuizStartVideoAd: boolean;
  showQuizEndAd: boolean;
  adIntervalSeconds: number;
  houseAd: {
    enabled: boolean;
    badge: string;
    title: string;
    description: string;
    ctaText: string;
    targetRoute: string;
  };
  updatedAt?: string;
}

export default function AdminAdsPage() {
  const [config, setConfig] = useState<AdConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  async function fetchConfig() {
    setLoading(true);
    try {
      const res = await fetch('/api/ad-config');
      const data = await res.json();
      setConfig(data);
    } catch (e) {
      console.error(e);
      setStatusMessage({ type: 'error', text: 'Failed to load ad configuration.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/ad-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (res.ok) {
        setConfig(data.config);
        setStatusMessage({ type: 'success', text: 'Ad configuration saved and broadcasted to mobile app successfully!' });
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error saving ad configuration.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading || !config) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mb-3" />
        <p className="text-slate-600 font-medium text-sm">Loading Ad Control Center...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 rounded-2xl text-white shadow-sm border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              WEBSITE AD CONTROL HUB
            </span>
            <span className="text-slate-400 text-xs">Live Sync</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">AdMob &amp; Mobile Ads Management</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Centrally control Google AdMob, Native Ads, and Quiz-Start Video Ads displayed on the native Android mobile app.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchConfig}
          className="self-start md:self-auto px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs sm:text-sm font-medium ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Master Control Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.adsEnabled ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Global Ad Serving Switch</h3>
                <p className="text-xs text-slate-500">Master switch to turn all AdMob and sponsored ads on or off across mobile app and web.</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.adsEnabled}
                onChange={(e) => setConfig({ ...config, adsEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        {/* Feature Switches Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            Ad Placement &amp; Format Toggles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Native Ad on Home */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                  <Layout className="w-3.5 h-3.5 text-blue-600" />
                  Home Screen Native Ad
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Show native sponsored card on the mobile home screen</p>
              </div>
              <input
                type="checkbox"
                checked={config.showHomeNativeAd}
                onChange={(e) => setConfig({ ...config, showHomeNativeAd: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
            </div>

            {/* Quiz-Start Video Ad */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                  <PlayCircle className="w-3.5 h-3.5 text-rose-600" />
                  Quiz-Start Video Ad
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Show video ad when candidate starts 100M Mock / Practice Quiz</p>
              </div>
              <input
                type="checkbox"
                checked={config.showQuizStartVideoAd}
                onChange={(e) => setConfig({ ...config, showQuizStartVideoAd: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
            </div>

            {/* Quiz-End Ad */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  Quiz-End Scorecard Ad
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Show ad when candidate finishes test and views score</p>
              </div>
              <input
                type="checkbox"
                checked={config.showQuizEndAd}
                onChange={(e) => setConfig({ ...config, showQuizEndAd: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
            </div>

            {/* House Ad Fallback */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  House / Direct Sponsorship
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Show direct internal banner if network ad is unavailable</p>
              </div>
              <input
                type="checkbox"
                checked={config.houseAd.enabled}
                onChange={(e) => setConfig({
                  ...config,
                  houseAd: { ...config.houseAd, enabled: e.target.checked }
                })}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* AdMob IDs Configuration */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              Google AdMob Unit IDs (Production or Test)
            </h3>
            <span className="text-[11px] text-slate-400">Defaults set to Google Official Test IDs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">AdMob App ID (Android)</label>
              <input
                type="text"
                value={config.admobAppId}
                onChange={(e) => setConfig({ ...config, admobAppId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                placeholder="ca-app-pub-3940256099942544~3347511713"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Native Ad Unit ID (Home Screen)</label>
              <input
                type="text"
                value={config.nativeAdUnitId}
                onChange={(e) => setConfig({ ...config, nativeAdUnitId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                placeholder="ca-app-pub-3940256099942544/2247696110"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Video Ad Unit ID (Quiz-Start Rewarded/Video)</label>
              <input
                type="text"
                value={config.rewardedVideoAdUnitId}
                onChange={(e) => setConfig({ ...config, rewardedVideoAdUnitId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                placeholder="ca-app-pub-3940256099942544/5224354917"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Interstitial Ad Unit ID</label>
              <input
                type="text"
                value={config.interstitialAdUnitId}
                onChange={(e) => setConfig({ ...config, interstitialAdUnitId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                placeholder="ca-app-pub-3940256099942544/1033173712"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Banner Ad Unit ID</label>
              <input
                type="text"
                value={config.bannerAdUnitId}
                onChange={(e) => setConfig({ ...config, bannerAdUnitId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                placeholder="ca-app-pub-3940256099942544/6300978111"
              />
            </div>
          </div>
        </div>

        {/* House / Sponsored Ad Customization */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Sponsored House Card Content</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Badge Text</label>
              <input
                type="text"
                value={config.houseAd.badge}
                onChange={(e) => setConfig({
                  ...config,
                  houseAd: { ...config.houseAd, badge: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Call to Action (Button)</label>
              <input
                type="text"
                value={config.houseAd.ctaText}
                onChange={(e) => setConfig({
                  ...config,
                  houseAd: { ...config.houseAd, ctaText: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Title</label>
              <input
                type="text"
                value={config.houseAd.title}
                onChange={(e) => setConfig({
                  ...config,
                  houseAd: { ...config.houseAd, title: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={config.houseAd.description}
                onChange={(e) => setConfig({
                  ...config,
                  houseAd: { ...config.houseAd, description: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-slate-400">
            Last updated: {config.updatedAt ? new Date(config.updatedAt).toLocaleString() : 'Never'}
          </p>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save &amp; Broadcast to App
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
