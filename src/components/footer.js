import '../_setup'
import { Box } from '@mujo/box'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Container } from './container'
import { Paragraph } from './fonts'
import { Link } from './link'

export const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            source
          }
        }
      }
    `
  )

  return (
    <Box
      flex="0"
      backgroundColor="masala"
      color="blackSqueez"
      Component="footer"
    >
      <Container>
        <Paragraph>
          <Box Component="span">{site.siteMetadata.author} © </Box>
          <Box Component="span">{new Date().getFullYear()} | </Box>
          <Link href={site.siteMetadata.source}>Source code</Link>
          <Box Component="span">
            {' '}
            | Built with <Link href="https://www.gatsbyjs.org">Gatsby</Link>
          </Box>
        </Paragraph>
      </Container>
    </Box>
  )
}
