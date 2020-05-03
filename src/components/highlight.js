import React from 'react'
import { Box } from './box'
import { Container } from './container'
import { Header5, Paragraph } from './fonts'

export const Highlight = ({ title, description, href, image }) => (
  <Box>
    <Container
      display="flex"
      alignItems="baseline"
      flexDirection="row"
      paddingLeft="none"
      paddingRight="none"
    >
      <Box
        backgroundColor="emperor"
        padding="l"
        borderRadius="s"
        flexDirection="row"
        flex="1"
        display="flex"
      >
        <Box flex="0">
          <Box
            marginRight="m"
            width="60px"
            height="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              maxWidth="100%"
              Component="img"
              alt="Highlight image"
              src={image}
            />
          </Box>
        </Box>
        <Box flex="1">
          <Header5 color="polar" marginBottom="none" marginTop="none">
            {title}
          </Header5>
          <Paragraph
            Component={href ? 'a' : 'p'}
            href={href}
            color="polar"
            marginBottom="none"
            marginTop="none"
          >
            {description}
          </Paragraph>
        </Box>
      </Box>
    </Container>
  </Box>
)
