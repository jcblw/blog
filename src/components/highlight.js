import React from 'react'
import { Box } from './box'
import { Container } from './container'
import { Header5, Paragraph } from './fonts'

const designs = {
  light: {
    color: 'limedSpruce',
    backgroundColor: 'linen',
  },
  bright: {
    color: 'limedSpruce',
    backgroundColor: 'hitPink',
  },
  dark: {
    color: 'linen',
    backgroundColor: 'blueBayoux',
  },
}

export const Highlight = ({
  title,
  description,
  href,
  image,
  imageAlt,
  round,
  design = 'light',
}) => {
  const { color, backgroundColor } = designs[design] || designs.light
  return (
    <Box>
      <Container
        display="flex"
        alignItems="baseline"
        flexDirection="row"
        paddingLeft="none"
        paddingRight="none"
      >
        <Box
          backgroundColor={backgroundColor}
          padding="l"
          borderRadius="m"
          flexDirection="row"
          flex="1"
          display="flex"
        >
          <Box
            display="flex"
            flex="0"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              marginRight="m"
              width="60px"
              height="60px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius={round && 'xl'}
              overflow="hidden"
            >
              <Box maxWidth="100%" Component="img" alt={imageAlt} src={image} />
            </Box>
          </Box>
          <Box flex="1">
            <Header5 color={color} marginBottom="none" marginTop="none">
              {title}
            </Header5>
            <Paragraph
              Component={href ? 'a' : 'p'}
              href={href}
              color={color}
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
}
