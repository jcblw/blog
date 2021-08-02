import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Box } from './box'
import { Container } from './container'
import { Header5, Paragraph } from './fonts'

export const Highlight = ({
  title,
  description,
  href,
  image,
  imageAlt,
  round,
  design = 'light',
}) => {
  const theme = useTheme()
  const designs = {
    light: {
      color: 'vulcan',
      backgroundColor: 'aeroBlue',
    },
    bright: {
      color: 'vulcan',
      backgroundColor: 'periwinkleGray',
    },
    dark: {
      color: theme.header,
      backgroundColor: theme.backgroundSecondary,
    },
  }
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
