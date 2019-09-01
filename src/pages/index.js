import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import { PostExcerpt } from '../components/post-excerpt'
import { SEO } from '../components/seo'
import { getPostData } from '../lib/get-post-data'

const AllPostsTemplate = props => {
  const posts = getPostData(props.data)
  const hasPosts = posts.length > 0
  return (
    <>
      <SEO title="Homepage" />
      <Layout location={props.location}>
        {hasPosts ? (
          posts.map(post => <PostExcerpt key={post.id} {...post} />)
        ) : (
          <div>no post found</div>
        )}
      </Layout>
    </>
  )
}

export default AllPostsTemplate

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: ASC }) {
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
