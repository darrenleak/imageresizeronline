import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getAllProgrammaticSlugs } from '@/lib/programmaticPages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://imageresizer.online';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Blog posts
  const posts = getAllPosts();
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Programmatic tool pages
  const toolSlugs = getAllProgrammaticSlugs();
  const toolPages = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tool/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...blogPages, ...toolPages];
}

