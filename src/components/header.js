import { Link, graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Box } from './box'
import { Container } from './container'
import { Header5, Paragraph } from './fonts'
import { DarkModeToggle } from './dark-mode-toggle'

export const Header = () => {
  const theme = useTheme()
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
    <Box Component="header" layer={1}>
      <Container
        display="flex"
        alignItems="center"
        flexDirection="row"
        paddingTop="m"
        paddingBottom="m"
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Header5
            alt={site.siteMetadata.description}
            color={theme.paragraph}
            marginRight="m"
            marginTop="none"
            marginBottom="none"
            display="flex"
          >
            {site.siteMetadata.title}
          </Header5>
        </Link>
        <Link to="/blog" style={{ textDecoration: 'none' }}>
          <Paragraph
            flex="1"
            display="inlineFlex"
            marginRight="m"
            color={theme.link}
            marginTop="none"
            marginBottom="none"
          >
            blog
          </Paragraph>
        </Link>
        <Link to="/talks" style={{ textDecoration: 'none' }}>
          <Paragraph
            flex="1"
            display="inlineFlex"
            marginRight="m"
            color={theme.link}
            marginTop="none"
            marginBottom="none"
          >
            talks
          </Paragraph>
        </Link>
        <Box flex="1" />
        <DarkModeToggle />
      </Container>
    </Box>
  )
}
