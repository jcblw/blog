import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { siteMetadata } from '../consts'

export async function GET(context: any) {
  const posts = await getCollection('blog')
  const videos = await getCollection('videos')
  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site,
    stylesheet: '/rss/styles.xsl',
    items: posts
      .filter((post) => !post.data.status || post.data.status !== 'draft')
      .map((post) => ({
        ...post.data,
        pubDate: post.data.date,
        link: `/${(post.data.slug || post.id).replace(/^\//, '')}/`,
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
