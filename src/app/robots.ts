import type { MetadataRoute } from 'next';

const BASE = 'https://burnoutmotors.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /maintenance is only reachable when MAINTENANCE_MODE is on; never index it.
      disallow: ['/maintenance', '/api/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
