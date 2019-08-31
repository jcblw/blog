import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import { PostExcerpt } from '../components/post-excerpt'
import { getPostData } from '../lib/get-post-data'

const AllPostsTemplate = props => {
  const posts = getPostData(props.data)
  const hasPosts = posts.length > 0
  return (
    <Layout location={props.location}>
      {hasPosts ? (
        posts.map(post => <PostExcerpt key={post.id} {...post} />)
      ) : (
        <div>no post found</div>
      )}
    </Layout>
  )
}

export default AllPostsTemplate

export const pageQuery = graphql`
  query {
    allMdx {
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
