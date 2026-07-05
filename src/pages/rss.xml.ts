import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import { siteMetadata } from '../consts'
import { isPublished, getPostSlug } from '../utils/posts'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog')
  const videos = await getCollection('videos')
  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site!,
    stylesheet: '/rss/styles.xsl',
    items: posts
      .filter(isPublished)
      .map((post) => ({
        ...post.data,
        pubDate: post.data.date,
        link: `/${getPostSlug(post)}/`,
      }))
      .concat(
        videos.map((video) => ({
          ...video.data,
          pubDate: video.data.date,
          link: `/talks/${video.id}/`,
          status: 'published',
        }))
      )
      .sort((a, b) => {
        return +b.date - +a.date
      }),
  })
}
