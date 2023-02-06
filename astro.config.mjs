import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import markdownIntegration from "@astropub/md";
import rehypeLinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { remarkReadingTime } from "./scripts/remark-reading-time.mjs";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://jcbl.ws",
  integrations: [
    mdx(),
    sitemap(),
    react(),
    markdownIntegration(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: "prism",
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeLinkHeadings,
        {
          behavior: "prepend",
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["heading-link"] },
            children: [{ type: "text", value: "⌗" }],
          },
        },
      ],
    ],
  },
});
