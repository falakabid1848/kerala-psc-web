import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: [
      'https://keralapsc.xyz/sitemap.xml',
      'https://www.keralapsc.xyz/sitemap.xml',
    ],
    host: 'https://keralapsc.xyz',
  };
}
