import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Box } from './box'
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
    <Box flex="0" color="white" Component="footer">
      <Container>
        <Paragraph>
          <Box Component="span">{site.siteMetadata.author} © </Box>
          <Box Component="span">{new Date().getFullYear()} | </Box>
          <Link href={site.siteMetadata.source}>Source code</Link>
        </Paragraph>
      </Container>
    </Box>
  )
}
