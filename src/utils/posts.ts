import type { CollectionEntry } from 'astro:content'

type Post = CollectionEntry<'blog'>

export const isPublished = (post: Post) => post.data.status === 'published'

export const getPostSlug = (post: Post) =>
  (post.data.slug || post.id).replace(/^\//, '')
