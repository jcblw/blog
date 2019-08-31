/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import '../_setup'
import { MDXProvider } from '@mdx-js/react'
import { Box } from '@mujo/box'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { GlobalStyles } from '../styles/globals'
import { Container } from './container'
import * as fonts from './fonts'
import Header from './header'
import { Link } from './link'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <MDXProvider
        components={{
          // Map HTML element tag to React component
          h1: fonts.Header1,
          h2: fonts.Header2,
          h3: fonts.Header3,
          h4: fonts.Header4,
          h5: fonts.Header5,
          h6: fonts.Header6,
          p: fonts.Paragraph,
          a: Link,
        }}
      >
        <GlobalStyles />
        <Header siteTitle={data.site.siteMetadata.title} />
        <Box backgroundColor="masala" color="blackSqueez" flex={1}>
          <Container flex="1">
            <Box Component="main">{children}</Box>
          </Container>
        </Box>
        <Box
          flex="0"
          paddingLeft="l"
          paddingRight="l"
          backgroundColor="masala"
          color="blackSqueez"
          Component="footer"
        >
          <fonts.Paragraph>
            Jacob Lowe © {new Date().getFullYear()}, Built with{' '}
            <Link href="https://www.gatsbyjs.org">Gatsby</Link>
          </fonts.Paragraph>
        </Box>
      </MDXProvider>
    )}
  />
)

Layout.propTypes = { children: PropTypes.node.isRequired }

export default Layout
