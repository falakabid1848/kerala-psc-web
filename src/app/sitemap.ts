import { MetadataRoute } from 'next';
import { getPreviousPapers } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.keralapsc.xyz';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/current-affairs`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/previous-papers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notifications`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/banking`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/bookmarks`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  try {
    const papers = getPreviousPapers();
    const paperRoutes: MetadataRoute.Sitemap = papers.map((paper) => ({
      url: `${baseUrl}/previous-papers/${paper.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
    return [...staticRoutes, ...paperRoutes];
  } catch (error) {
    console.error('Error generating dynamic paper sitemap entries:', error);
    return staticRoutes;
  }
}
