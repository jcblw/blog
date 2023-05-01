export default async function (request) {
  return new Response('THIS WORKS', {
    headers: {
      'content-type': 'text/plain',
    },
  })
}
