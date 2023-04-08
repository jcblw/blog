function handleMiddlewareField(init, headers) {
  var _a
  if (
    (_a = init == null ? void 0 : init.request) == null ? void 0 : _a.headers
  ) {
    if (!(init.request.headers instanceof Headers)) {
      throw new Error('request.headers must be an instance of Headers')
    }
    const keys = []
    for (const [key, value] of init.request.headers) {
      headers.set('x-middleware-request-' + key, value)
      keys.push(key)
    }
    headers.set('x-middleware-override-headers', keys.join(','))
  }
}
function rewrite(destination, init) {
  const headers = new Headers((init == null ? void 0 : init.headers) ?? {})
  headers.set('x-middleware-rewrite', String(destination))
  handleMiddlewareField(init, headers)
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
