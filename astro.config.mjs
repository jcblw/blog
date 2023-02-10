import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercelImage from 'astro-vercel-image'
import react from '@astrojs/react'
import markdownIntegration from '@astropub/md'
import rehypeLinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { remarkReadingTime } from './scripts/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://jcbl.ws',
  output: 'static',
  integrations: [
    mdx(),
    sitemap(),
    react(),
    markdownIntegration(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    vercelImage({
      sizes: [640, 750, 828, 1080, 1200],
      domains: [],
      minimumCacheTTL: 60,
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '^avatars1\\.githubusercontent\\.com$',
          pathname: '^/u/578259\\?s=460&v=4$',
        },
      ],
    }),
  ],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeLinkHeadings,
        {
          behavior: 'prepend',
          content: {
            type: 'element',
            tagName: 'span',
            properties: { className: ['heading-link'] },
            children: [{ type: 'text', value: '⌗' }],
          },
        },
      ],
    ],
  },
})
