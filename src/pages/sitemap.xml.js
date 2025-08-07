import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const posts = await getCollection('posts');
  
  const staticPages = [
    {
      url: new URL('/', site).href,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: new URL('/writing', site).href,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8
    }
  ];

  const dynamicPages = posts.map(post => ({
    url: new URL(`/writing/${post.id}`, site).href,
    lastmod: post.data.date?.toISOString() || new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.6
  }));

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
