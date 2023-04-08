function rewrite(destination, init) {
  const headers = new Headers({})
  headers.set('Location', String(destination))
  return new Response(null, {
    ...init,
    headers,
  })
}
/**
 * Edge middleware, I set this up so we can do a redirect from blog posts with a trailing slash
 * to the same post without a trailing slash. This was to resolve some issues with Google indexing
 */
export default function middleware(request, _event) {
  const url = new URL(request.url)
  const { pathname } = url
  const hasTrailingSlash = pathname.endsWith('/')
  const hasPathname = pathname !== '/'
  if (hasTrailingSlash && hasPathname) {
    return rewrite(new URL(pathname.slice(0, -1), url.origin), {
      status: 301,
    })
  }
}
