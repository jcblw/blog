import '../_setup'
import { Box } from '@mujo/box'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Container } from './container'
import { Header5, Paragraph } from './fonts'

export const Author = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            aboutAuthor
            avatar
          }
        }
      }
    `
  )
  return (
    <Box Component="aside" backgroundColor="masala">
      <Container
        display="flex"
        alignItems="baseline"
        direction="row"
        paddingLeft="none"
        paddingRight="none"
      >
        <Box
          backgroundColor="emperor"
          padding="l"
          borderRadius="l"
          direction="row"
          flex="1"
          display="flex"
        >
          <Box flex="0">
            <Box
              marginRight="m"
              width="60px"
              height="60px"
              overflow="hidden"
              borderRadius="xl"
            >
              <Box
                maxWidth="100%"
                Component="img"
                alt="Author avatar"
                src={site.siteMetadata.avatar}
              />
            </Box>
          </Box>
          <Box flex="1">
            <Header5 color="polar" marginBottom="none" marginTop="none">
              {site.siteMetadata.author}
            </Header5>
            <Paragraph color="polar" marginBottom="none" marginTop="none">
              {site.siteMetadata.aboutAuthor}
            </Paragraph>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
