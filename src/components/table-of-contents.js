import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Header6 } from './fonts'
import { Box } from './box'
import { Link } from './link'

export const TableOfContents = ({ contents }) => {
  const theme = useTheme()
  return (
    <>
      {/* This moves the content below the header of the article */}
      <Box paddingBottom="xxl" paddingTop="xxl" />
      <Box
        paddingTop="xxl"
        position="sticky"
        top={0}
        css={{
          display: 'none',
          '@media(min-width: 1280px)': {
            display: 'block',
          },
        }}
      >
        <Box
          textAlign="left"
          marginTop="xxl"
          borderRadius="m"
          backgroundColor={theme.backgroundSecondary}
          padding="s"
          marginRight="xl"
        >
          <Header6
            marginBottom="zero"
            marginTop="zero"
            paddingBottom="s"
            color={theme.header}
          >
            Table of Contents
          </Header6>
          {contents.items.map((item, index) => (
            <Box
              paddingLeft="s"
              paddingBottom="xs"
              key={`${item.title}:${index}`}
            >
              <Link href={item.url} color={theme.link}>
                {item.title}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}
