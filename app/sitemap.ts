import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pdftoolkit.com'
  const currentDate = new Date().toISOString()

  const tools = [
    'edit-text',
    'merge',
    'split',
    'compress',
    'rotate',
    'pdf-to-images',
    'images-to-pdf',
    'extract-pages',
    'watermark',
    'remove-pages',
    'reorder-pages',
    'flatten-pdf',
  ]

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const guides = [
    'how-to-merge-pdf',
    'how-to-compress-pdf',
    'how-to-split-pdf',
    'how-to-edit-pdf',
    'pdf-tools-comparison',
  ]

  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/${guide}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const legalPages = [
    { url: `${baseUrl}/privacy`, priority: 0.3 },
    { url: `${baseUrl}/terms`, priority: 0.3 },
  ].map((page) => ({
    url: page.url,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }))

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...toolPages,
    ...guidePages,
    ...legalPages,
  ]
}

