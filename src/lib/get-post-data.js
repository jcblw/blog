export const getPostData = data => {
  if (!data || !data.allMdx) {
    return []
  }
  return data.allMdx.edges.map(edge => edge.node)
}
