import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lamentedelguerreromt.com';
  const now = new Date();

  const publicRoutes = [
    '',
    '/dashboard/day/1',
    '/login',
    '/register',
    '/checkout',
  ];

  const locales = ['es', 'en'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Root redirect entry
  sitemapEntries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Localized routes
  locales.forEach((locale) => {
    publicRoutes.forEach((route) => {
      const path = route ? `/${locale}${route}` : `/${locale}`;
      sitemapEntries.push({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.includes('day/1') ? 0.9 : 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/es${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
