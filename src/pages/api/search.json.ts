
import { searchPosts } from '../../utils/sql'

import type { APIRoute } from 'astro';


export const GET: APIRoute = async ({ params }) => {

const query = params['query']
const posts = query ? await searchPosts(query) : []

console.log(query, posts)
  return new Response(
    JSON.stringify({
      query,
      posts,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
} 
