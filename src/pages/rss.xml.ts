import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { siteMetadata } from '../consts'

export async function get(context: any) {
  const posts = await getCollection('blog')
  const videos = await getCollection('videos')
  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site,
    items: posts
      .map((post) => ({
        ...post.data,
        pubDate: post.data.date,
        link: `/blog/${post.slug}/`,
      }))
      .concat(
        videos.map((video) => ({
          ...video.data,
          pubDate: video.data.date,
          link: `/videos/${video.slug}/`,
          status: 'published',
        }))
      ),
  })
}
