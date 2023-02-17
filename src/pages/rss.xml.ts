import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { siteMetadata } from '../consts'

const isProduction = import.meta.env.MODE === 'production'

export async function get(context: any) {
  const posts = await getCollection('blog')
  const videos = await getCollection('videos')
  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site,
    items: posts
      .filter((post) => isProduction || post.data.status === 'published')
      .map((post) => ({
        ...post.data,
        pubDate: post.data.date,
        link: `/${post.slug}/`,
      }))
      .concat(
        videos.map((video) => ({
          ...video.data,
          pubDate: video.data.date,
          link: `/talks/${video.slug}/`,
          status: 'published',
        }))
      )
      .sort((a, b) => {
        return +b.date - +a.date
      }),
  })
}
