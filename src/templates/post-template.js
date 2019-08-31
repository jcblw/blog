import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Layout from '../components/layout'
import { PostTitle } from '../components/post-title'

const PostTemplate = props => {
  console.log(props)
  return (
    <Layout location={props.location}>
      <PostTitle {...props.data.mdx} />
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query getPost($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      body
      timeToRead
      frontmatter {
        date
        description
        slug
        title
      }
    }
  }
`
