import '../_setup'
import { MDXProvider } from '@mdx-js/react'
import { Box } from '@mujo/box'
import PropTypes from 'prop-types'
import React from 'react'
import { GlobalStyles } from '../styles/globals'
import { Author } from './author'
import { Container } from './container'
import {
  Paragraph,
  Header1,
  Header2,
  Header3,
  Header4,
  Header5,
  Header6,
} from './fonts'
import { Footer } from './footer'
import { Header } from './header'
import { Link } from './link'

const Layout = ({ children }) => (
  <MDXProvider
    components={{
      // Map HTML element tag to React component
      h1: Header1,
      h2: Header2,
      h3: Header3,
      h4: Header4,
      h5: Header5,
      h6: Header6,
      p: Paragraph,
      a: Link,
    }}
  >
    <GlobalStyles />
    <Header />
    <Box backgroundColor="masala" color="blackSqueez" flex={1}>
      <Container flex="1">
        <Box Component="main">{children}</Box>
      </Container>
      <Container flex="1">
        <Author />
      </Container>
      <Footer />
    </Box>
  </MDXProvider>
)

Layout.propTypes = { children: PropTypes.node.isRequired }

export default Layout
