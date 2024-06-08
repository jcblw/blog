import { sql } from '@vercel/postgres'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import 'dotenv/config'

export const getSimilarPosts = async (slug: string) => {
    const { rows } = await sql<{
        id: number;
        slug: string;
        title: string;
        description: string;
        hero_image: string | null;
        similarity: number | null;
    }>`
      -- Step 1: Retrieve the embedding vector of the blog post with the given slug
      WITH target_post AS (
          SELECT embeddings
          FROM Post
          WHERE slug = ${slug}
      )
      -- Step 2: Use this embedding vector to find the most similar blog posts
      SELECT id, slug, title, description, hero_image, 
            embeddings <=> (SELECT embeddings FROM target_post) AS similarity
      FROM Post
      WHERE slug != ${slug}  -- Exclude the target post itself
      ORDER BY embeddings <=> (SELECT embeddings FROM target_post) ASC
      LIMIT 3;
    `;
    return rows;
}

export const searchPosts = async (query: string) => {
    // take query and create embedding
    const embeddings = (
      await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: query,
      })
    ).embedding
    const stringEmbeddings = `[${embeddings.join(',')}]`

    // search for similar posts
    const { rows } = await sql<{
        id: number;
        slug: string;
        title: string;
        description: string;
        hero_image: string | null;
        similarity: number | null;
    }>`
      SELECT id, slug, title, description, hero_image, 
            embeddings <=> ${stringEmbeddings} AS similarity
      FROM Post
      ORDER BY embeddings <=> ${stringEmbeddings}
      LIMIT 3;
    `
    return rows
}