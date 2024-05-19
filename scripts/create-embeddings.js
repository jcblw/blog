import { HfInference } from '@huggingface/inference'
import fs from 'node:fs/promises'
import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const hf = new HfInference(process.env.HF_TOKEN)
const dirname = path.dirname(fileURLToPath(import.meta.url))
const model = 'thenlper/gte-large'

const SKIP_EMBEDDINGS = false

/**
 * @type {(folder: string) => (file: string) => string}
 */
const resolveContent = (folder) => (file) =>
  path.resolve(dirname, '../src/content', folder, file)

/**
 * cosine similarity checks the similarity between two vectors
 * @type {(a: number[], b: number[]) => number}
 */
const cosineSimilarity = (a, b) => {
  if (a.length !== b.length) {
    throw new Error('Vectors must be of the same length')
  }

  const dotProduct = a.reduce((acc, val, i) => acc + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((acc, val) => acc + val ** 2, 0))
  const magnitudeB = Math.sqrt(b.reduce((acc, val) => acc + val ** 2, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

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
  ].filter((file) => file.endsWith('.mdx'))

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

  /**
   * generate embeddings for each file in the content directory
   * and store it in the cache
   *
   * This runs sequentially to avoid slamming the huggingface API
   *
   * @type {Promise<void>}
   */
  await files.reduce(async (promise, file) => {
    return promise.then(async () => {
      const fileCache = cache.get(file)
      if (!fileCache) {
        return
      }
      const { content, isDraft } = fileCache
      if (isDraft || !content || content?.includes('status: draft')) {
        return Promise.resolve()
      }
      console.log(`Generating embeddings for ${file}...`)
      const embeddings = await hf.featureExtraction({
        model,
        inputs: content,
      })
      if (isOneDimensionalArray(embeddings)) {
        console.log(`Embeddings generated for ${file}!`)
        cache.set(file, { ...fileCache, embeddings })
      }
    })
  }, Promise.resolve())

  console.log('Embeddings generated! 🚀')
  console.log('Calculating cosine similarities...')

  /**
   * calculate cosine similarity between embeddings,
   * and write the results to a file. the format of the file would be:
   * {
   *  "file1": [{ similarity: 0.1, file: "file2" }], // cosine similarity with other files
   * }
   */
  const similarities = files.reduce((acc, file, i) => {
    const fileCache = cache.get(file)
    console.log({ fileCache })
    if (!fileCache?.embeddings || !fileCache?.slug) {
      console.log(`Skipping ${file}...`)
      return acc
    }
    const slug = fileCache?.slug
    const embeddings = fileCache.embeddings
    const similarities = files
      .map((e) => {
        const _cache = cache.get(e)
        if (!_cache?.embeddings || _cache?.isDraft) {
          return null
        }
        return {
          similarity: cosineSimilarity(embeddings, _cache.embeddings),
          slug: _cache?.slug,
          title: _cache?.title,
          description: _cache?.description,
          heroImage: _cache?.heroImage,
        }
      })
      .filter((x) => !!x)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(1, 4)
    return {
      ...acc,
      [slug]: similarities,
    }
  }, {})

  console.log(similarities)

  cache.clear()
  if (SKIP_EMBEDDINGS) {
    return
  }
  const similaritiesFile = path.resolve(dirname, '../similarities.json')
  await fs.writeFile(similaritiesFile, JSON.stringify(similarities, null, 2))

  console.log('Cosine similarities calculated! 🚀')
  console.log(`Similarities written to ${similaritiesFile}`)
})()
