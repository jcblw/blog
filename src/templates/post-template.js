import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect } from 'react'
import Prism from 'prismjs'
import { DiscussionEmbed } from 'disqus-react'

import { Box } from '../components/box'
import { HR } from '../components/hr'
import Layout from '../components/layout'
import { Link } from '../components/link'
import { PostTitle } from '../components/post-title'
import { SEO } from '../components/seo'
import { PrismaStyles } from '../styles/prisma'
import { TableOfContents } from '../components/table-of-contents'

// eslint-disable-next-line react/display-name
const components = { wrapper: ({ children }) => <>{children}</> }

const PostTemplate = props => {
  const { mdx, site } = props.data
  const { siteMetadata: meta } = site
  const { parent: mdxp } = mdx
  const srcPath = `src/content/blog/${mdxp.relativePath}`
  const github = `${meta.source}/tree/master/${srcPath}`
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: mdx.frontmatter.slug, title: mdx.frontmatter.title },
  }

  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <PrismaStyles />
      <Layout
        location={props.location}
        sidebarContent={
          mdx.tableOfContents &&
          mdx.tableOfContents.items && (
            <TableOfContents contents={mdx.tableOfContents} />
          )
        }
      >
        <PostTitle {...mdx} />
        <HR />
        <Box color="white">
          <MDXRenderer components={components}>{mdx.body}</MDXRenderer>
        </Box>
        <HR />
        <Box display="flex" flexDirection="row">
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
        <Box>
          <DiscussionEmbed {...disqusConfig} />
        </Box>
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
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
    }
  }
`
