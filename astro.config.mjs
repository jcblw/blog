import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import rehypeLinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { remarkReadingTime } from './scripts/remark-reading-time.mjs';
import tailwind from '@astrojs/tailwind';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://jcbl.ws',
  output: 'hybrid',
  trailingSlash: 'never',
  integrations: [
    mdx({
      syntaxHighlight: 'prism',
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [rehypeSlug, [rehypeLinkHeadings, {
        behavior: 'prepend',
        content: {
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['heading-link']
          },
          children: [{
            type: 'text',
            value: '⌗'
          }]
        }
      }]]
    }), 
    react(), 
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // serialize function should strip away trailing slashes on urls to match canonical urls
      serialize: ({
        url,
        ...otherProps
      }) => ({
        url: url.replace(/\/$/, ''),
        ...otherProps
      }),
      filter: page => !page.includes('draft')
    }), 
    tailwind()
  ],
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      domains: ['jcbl.ws'],
      sizes: [320, 640, 1280],
    },
  })
});