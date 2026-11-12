import { NextRequest, NextResponse } from 'next/server';
import { getPreviousPapers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'keralapsc.xyz';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  // Use host dynamically so if accessed via keralapsc.xyz, www.keralapsc.xyz, or vercel.app,
  // all <loc> URLs inside match the exact host requested by Google Search Console!
  const baseUrl = `${protocol}://${host}`;
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/current-affairs', priority: '0.95', changefreq: 'daily' },
    { path: '/quiz', priority: '0.95', changefreq: 'daily' },
    { path: '/previous-papers', priority: '0.9', changefreq: 'weekly' },
    { path: '/notifications', priority: '0.9', changefreq: 'daily' },
    { path: '/banking', priority: '0.85', changefreq: 'weekly' },
    { path: '/bookmarks', priority: '0.6', changefreq: 'monthly' },
    { path: '/analytics', priority: '0.6', changefreq: 'monthly' },
  ];

  let dynamicPages: { path: string; priority: string; changefreq: string }[] = [];
  try {
    const papers = getPreviousPapers();
    dynamicPages = papers.map((paper) => ({
      path: `/previous-papers/${paper.id}`,
      priority: '0.8',
      changefreq: 'monthly',
    }));
  } catch (error) {
    console.error('Error loading papers for sitemap:', error);
  }

  const allPages = [...staticPages, ...dynamicPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path ? page.path : '/'}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
