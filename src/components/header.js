import '../_setup'
import { Box } from '@mujo/box'
import { Link, graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Container } from './container'
import { Header5, Paragraph } from './fonts'

export const Header = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )
  return (
    <Box Component="header" backgroundColor="masala">
      <Container
        display="flex"
        alignItems="baseline"
        direction="row"
        paddingTop="m"
        paddingBottom="m"
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Header5
            alt="Jacob Lowe"
            color="polar"
            marginRight="s"
            marginTop="none"
            marginBottom="none"
            display="flex"
          >
            {site.siteMetadata.title}
          </Header5>
        </Link>
        <Paragraph
          flex="1"
          display="inlineFlex"
          color="blackSqueez"
          marginTop="none"
          marginBottom="none"
        >
          {site.siteMetadata.description}
        </Paragraph>
      </Container>
    </Box>
  )
}
