import { graphql } from 'gatsby'
import React from 'react'
import { Header1, Paragraph } from '../components/fonts'
import Layout from '../components/layout'
import { SEO } from '../components/seo'

const NotFoundPage = props => (
  <Layout noAuthor>
    <SEO title="404 - Not found" />
    <Header1>Not Found</Header1>
    <Paragraph>Everything in life is temporary, like this page.</Paragraph>
  </Layout>
)

export default NotFoundPage

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
