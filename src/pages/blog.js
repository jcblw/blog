import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import { PostExcerpt } from '../components/post-excerpt'
import { SEO } from '../components/seo'
import { getPostData } from '../lib/get-post-data'
import { Header1, Header6, Paragraph } from '../components/fonts'
import { Box } from '../components/box'

const AllPostsTemplate = props => {
  const posts = getPostData(props.data)
  const hasPosts = posts.length > 0
  return (
    <>
      <SEO title="Homepage" />
      <Layout location={props.location}>
        {hasPosts ? (
          <>
            <Header6 marginBottom="zero" color="calico">
              Latest blog posts
            </Header6>
            {posts.map(post => (
              <PostExcerpt key={post.id} {...post} />
            ))}
          </>
        ) : (
          <Box padding="l">
            <Header1>Not Found</Header1>
            <Paragraph>
              Everything in life is temporary, like this page.
            </Paragraph>
          </Box>
        )}
      </Layout>
    </>
  )
}

export default AllPostsTemplate

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { status: { eq: "published" } } }
    ) {
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