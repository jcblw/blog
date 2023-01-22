const postDateToJSDate = date => {
  const [year, month, day] = date
    .split('T')[0]
    ?.split('-')
    .map(Number)
  return new Date(year, month - 1, day)
}

export const sortPosts = posts =>
  posts.sort(
    (a, b) =>
      +postDateToJSDate(b.frontmatter.date) -
      +postDateToJSDate(a.frontmatter.date)
  )

export const getPostData = data => {
  if (!data || !data.allMdx) {
    return []
  }
  return sortPosts(data.allMdx.edges.map(edge => edge.node) ?? [])
}
