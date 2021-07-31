import { MDXProvider } from '@mdx-js/react'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Canvas, Canvas2d } from 'react-scribble'
import { GlobalStyles } from '../styles/globals'
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
import { Blob } from './genrative-art'
import { Header } from './header'
import { Link } from './link'

const { Clear } = Canvas2d

const safeWindow =
  typeof window !== 'undefined'
    ? window
    : {
        innerWidth: 800,
        innerHeight: 600,
      }

const Layout = ({ children, noAuthor }) => (
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
    <Canvas
      loop
      width={safeWindow.innerWidth}
      height={safeWindow.innerHeight}
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 0,
      }}
      meta={useRef(0)}
    >
      <Clear />
      {/* 
        TODO see if we can get the context to wrap around articles 
        so they can modify the canvas 
      */}
      <Blob
        x={safeWindow.innerHeight * 0.5}
        y={safeWindow.innerHeight * 0.5}
        radius={safeWindow.innerHeight * 0.1}
        lr={safeWindow.innerHeight * 0.5}
      />
    </Canvas>
    <Header />
    <Box color="white" flex={1} display="flex" flexDirection="column" layer={1}>
      <Container flex="1">
        <Box Component="main" display="flex" flexDirection="column">
          {children}
        </Box>
      </Container>
      {!noAuthor && (
        <Container flex="1">
          <Author />
        </Container>
      )}
      <Footer />
    </Box>
  </MDXProvider>
)

Layout.propTypes = { children: PropTypes.node.isRequired }

export default Layout
