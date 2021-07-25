/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

const getPostData = data => {
  if (!data || !data.allMdx) {
    return []
  }
  return data.allMdx.edges.map(edge => edge.node)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allMdx(sort: { fields: frontmatter___date, order: DESC }) {
          edges {
            node {
              id
              frontmatter {
                title
                slug
                date
                description
              }
              timeToRead
            }
          }
        }
      }
    `
  )
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  const posts = getPostData(result.data)
  // Create pages for each markdown file.
  const postTemplate = path.resolve('src/templates/post-template.js')
  posts.forEach(post => {
    const { slug } = post.frontmatter
    createPage({
      path: slug,
      component: postTemplate,
      // In your blog post template's graphql query, you can use path
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        slug,
      },
    })
    reporter.info(`Page created: ${slug}`)
  })
}
