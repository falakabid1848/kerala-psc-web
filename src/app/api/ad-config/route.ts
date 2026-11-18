import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getAdConfigFile(): string {
  const candidates = [
    path.resolve(process.cwd(), 'data/ad_config.json'),
    path.resolve(process.cwd(), '../../data/ad_config.json'),
    path.resolve(process.cwd(), '../data/ad_config.json'),
    '/Users/abidkt/.gemini/antigravity/scratch/kerala-psc-quiz/data/ad_config.json'
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

const DEFAULT_CONFIG = {
  adsEnabled: true,
  admobAppId: "ca-app-pub-3940256099942544~3347511713",
  bannerAdUnitId: "ca-app-pub-3940256099942544/6300978111",
  nativeAdUnitId: "ca-app-pub-3940256099942544/2247696110",
  interstitialAdUnitId: "ca-app-pub-3940256099942544/1033173712",
  rewardedVideoAdUnitId: "ca-app-pub-3940256099942544/5224354917",
  showHomeNativeAd: true,
  showQuizStartVideoAd: true,
  showQuizEndAd: true,
  adIntervalSeconds: 60,
  houseAd: {
    enabled: true,
    badge: "SPONSORED PREPARATION",
    title: "Kerala PSC Degree Level Prelims 2026 Test Series",
    description: "Attempt official 100-mark OMR simulation tests with Kerala rank predictor and instant negative mark analysis.",
    ctaText: "Start Free Mock Test",
    targetRoute: "mock_test"
  },
  updatedAt: new Date().toISOString()
};

export async function GET() {
  try {
    const filePath = getAdConfigFile();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return NextResponse.json(JSON.parse(data), {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0'
        }
      });
    }
    return NextResponse.json(DEFAULT_CONFIG, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    console.error('Error reading ad config:', error);
    return NextResponse.json(DEFAULT_CONFIG, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = {
      ...DEFAULT_CONFIG,
      ...body,
      updatedAt: new Date().toISOString()
    };

    const filePath = getAdConfigFile();
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');

    // Also copy to root data and android assets if possible
    const rootData = '/Users/abidkt/.gemini/antigravity/scratch/kerala-psc-quiz/data/ad_config.json';
    const androidAssets = '/Users/abidkt/.gemini/antigravity/scratch/kerala-psc-quiz/apps/android-app/app/src/main/assets/ad_config.json';
    try {
      if (fs.existsSync(path.dirname(rootData))) {
        fs.writeFileSync(rootData, JSON.stringify(updated, null, 2), 'utf-8');
      }
      if (fs.existsSync(path.dirname(androidAssets))) {
        fs.writeFileSync(androidAssets, JSON.stringify(updated, null, 2), 'utf-8');
      }
    } catch (e) {
      // ignore
    }

    return NextResponse.json({
      success: true,
      message: 'Ad configuration updated successfully',
      config: updated
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    console.error('Error saving ad config:', error);
    return NextResponse.json(
      { error: 'Failed to update ad configuration' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
