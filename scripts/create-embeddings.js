import fs from 'node:fs/promises'
import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sql } from '@vercel/postgres'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'

const args = process.argv.slice(2)

const shouldRegenerate = args.includes('--regenerate')

const dirname = path.dirname(fileURLToPath(import.meta.url))


/**
 * @type {(folder: string) => (file: string) => string}
 */
const resolveContent = (folder) => (file) =>
  path.resolve(dirname, '../src/content', folder, file)


/**
 * @type {(x: any) => x is number[]}
 */
const isOneDimensionalArray = (x) =>
  Array.isArray(x) && x.every((y) => typeof y === 'number')

;(async () => {
  console.log('Generating embeddings...')
  const resolveBlog = resolveContent('blog')
  const resolveVideo = resolveContent('videos')
  const blogContentDirectory = resolveBlog('')
  const videoContentDirectory = resolveVideo('')
  console.log(`Blog content directory: ${blogContentDirectory}`)
  console.log(`Video content directory: ${videoContentDirectory}`)
  /**
   * @type {Map<string, {
   *  slug?: string
   *  content?: string
   *  isDraft?: boolean
   *  embeddings?: number[]
   *  title?: string
   *  description?: string
   *  heroImage?: string
   *  similar?: Array<{
   *   similarity: number
   *   slug: string
   *   title?: string
   *   description?: string
   *   heroImage?: string
   *  }>
   * }>}
   */
  const cache = new Map()

  const blogPosts = await fs.readdir(blogContentDirectory)
  const videoPosts = await fs.readdir(videoContentDirectory)
  const files = [
    ...blogPosts.map((f) => resolveBlog(f)),
    ...videoPosts.map((f) => resolveVideo(f)),
  ].filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))

  console.log(`Found ${files.length} files...`)

  await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file, 'utf-8')
      if (content.includes('status: draft')) {
        cache.set(file, { isDraft: true })
        return null
      }
      const slug = content.match(/slug: (.*)/)?.[1]
      const descriptor = {
        content,
        title: content.match(/title: (.*)/)?.[1],
        description: content.match(/description: (.*)/)?.[1],
        slug: slug ?? `/talks/${file.split('/').pop()?.split('.')[0]}`,
        heroImage: content.match(/heroImage: (.*)/)?.[1],
        isDraft: false,
      }

      cache.set(file, descriptor)
    })
  )

  if (shouldRegenerate) {
    // clear the database
    await sql`DELETE FROM Post`
  }

  const { rows: generatedEmbeddings } = await sql`
    SELECT slug FROM Post WHERE embeddings IS NOT NULL
  `;
  const filesWithoutEmbeddings = files.filter(file => {
    const fileCache = cache.get(file)
    if (!fileCache || !fileCache.slug) {
      return false
    }
    return !generatedEmbeddings.some(({ slug }) => slug === fileCache.slug)
  })

  console.log(`Generating embeddings for ${filesWithoutEmbeddings.length} files...`)

  /**
   * generate embeddings for each file in the content directory
   * and store it in the cache
   *
   * This runs sequentially to avoid slamming the API
   *
   * @type {Promise<void>}
   */
  await filesWithoutEmbeddings.reduce(async (promise, file) => {
    return promise.then(async () => {
      const fileCache = cache.get(file)
      if (!fileCache) {
        return
      }
      const { content, isDraft } = fileCache
      if (isDraft || !content || content?.includes('status: draft')) {
        return Promise.resolve()
      }
      const embeddings = (
        await embed({
          model: openai.embedding('text-embedding-3-small'),
          value: content,
        })
      ).embedding
      if (isOneDimensionalArray(embeddings)) {
        cache.set(file, { ...fileCache, embeddings })
        const embeddingsString = `[${embeddings.join(',')}]`
        await sql`
          INSERT INTO Post (slug, content, is_draft, embeddings, title, description, hero_image)
          VALUES (${fileCache.slug}, ${content}, ${isDraft}, ${embeddingsString}, ${fileCache.title}, ${fileCache.description}, ${fileCache.heroImage})
        `
      }
    })
  }, Promise.resolve())

  console.log('Embeddings generated! 🚀')
})()
