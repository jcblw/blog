import { Box } from '@mujo/box'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { HR } from '../components/hr'
import Layout from '../components/layout'
import { Link } from '../components/link'
import { PostTitle } from '../components/post-title'
import { SEO } from '../components/seo'

const PostTemplate = props => {
  const { mdx, site } = props.data
  const { siteMetadata: meta } = site
  const { parent: mdxp } = mdx
  const srcPath = `src/content/blog/${mdxp.relativePath}`
  const github = `${meta.source}/tree/master/${srcPath}`
  return (
    <>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <Layout location={props.location}>
        <PostTitle {...mdx} />
        <HR />
        <Box color="white">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Box>
        <HR />
        <Box display="flex" direction="row">
          <Link
            href={`https://mobile.twitter.com/search?q=${meta.siteUrl}`}
            paddingRight="l"
            marginTop="none"
            marginBottom="none"
          >
            Discuss it on Twitter
          </Link>
          <Link href={github} marginTop="none" marginBottom="none">
            Edit on Github
          </Link>
        </Box>
        <HR />
      </Layout>
    </>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query getPost($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        source
      }
    }
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
      parent {
        ... on File {
          relativePath
        }
      }
    }
  }
`
