import { MDXProvider } from '@mdx-js/react'
import PropTypes from 'prop-types'
import React from 'react'
import { GlobalStyles } from '../styles/globals'
import { ThemeProvider, useTheme } from '../hooks/useTheme'
import { Author } from './author'
import { Box } from './box'
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
import { Canvas } from './extras/canvas'
import { Blockquote } from './blockquote'

const Layout = ({ children, noAuthor, sidebarContent }) => {
  const theme = useTheme()
  return (
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
        blockquote: Blockquote,
      }}
    >
      <GlobalStyles />
      <Canvas />
      <Header />
      <Box
        color={theme.paragraph}
        flex={1}
        display="flex"
        flexDirection="column"
        layer={1}
      >
        <Container sidebarContent={sidebarContent}>
          <Box Component="main" display="flex" flexDirection="column">
            {children}
          </Box>
        </Container>
        {!noAuthor && (
          <Container>
            <Author />
          </Container>
        )}
        <Footer />
      </Box>
    </MDXProvider>
  )
}

const LayoutWithTheme = props => (
  <ThemeProvider>
    <Layout {...props} />
  </ThemeProvider>
)

Layout.propTypes = { children: PropTypes.node.isRequired }

export default LayoutWithTheme
