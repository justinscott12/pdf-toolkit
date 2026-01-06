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

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...toolPages,
  ]
}

