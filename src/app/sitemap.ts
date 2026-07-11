import type { MetadataRoute } from 'next'

import { getPosts } from '@/lib/queries/posts'
import { getProjects } from '@/lib/queries/projects'
import { getServices } from '@/lib/queries/services'
import { siteUrl } from '@/lib/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, posts] = await Promise.all([
    getServices(),
    getProjects(),
    getPosts(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/services`, priority: 0.9 },
    { url: `${siteUrl}/portfolio`, priority: 0.8 },
    { url: `${siteUrl}/blog`, priority: 0.8 },
    { url: `${siteUrl}/about`, priority: 0.7 },
    { url: `${siteUrl}/contact`, priority: 0.7 },
    { url: `${siteUrl}/privacy-policy`, priority: 0.3 },
  ]

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: service.updatedAt,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/portfolio/${project.slug}`,
      lastModified: project.updatedAt,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      priority: 0.6,
    })),
  ]
}
