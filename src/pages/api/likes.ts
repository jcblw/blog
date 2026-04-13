import type { APIRoute } from 'astro'
import { sql } from '@vercel/postgres'
import 'dotenv/config'

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get('slug')
  if (!slug) {
    return new Response(JSON.stringify({ error: 'slug is required' }), {
      status: 400,
    })
  }

  const { rows } = await sql`SELECT likes FROM Post WHERE slug = ${slug}`
  const likes = rows[0]?.likes ?? 0

  return new Response(JSON.stringify({ likes }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { slug } = body

  if (!slug) {
    return new Response(JSON.stringify({ error: 'slug is required' }), {
      status: 400,
    })
  }

  const { rows } = await sql`
    UPDATE Post SET likes = COALESCE(likes, 0) + 1 WHERE slug = ${slug}
    RETURNING likes
  `
  const likes = rows[0]?.likes ?? 0

  return new Response(JSON.stringify({ likes }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
