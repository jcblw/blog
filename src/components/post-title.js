import format from 'date-fns/format'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Box } from './box'
import { Header1, Paragraph } from './fonts'

export const PostTitle = props => {
  const theme = useTheme()
  return (
    <Box paddingTop="l">
      <Header1 color={theme.link} marginTop="none" marginBottom="s">
        {props.frontmatter.title}
      </Header1>
      <Box display="flex" flexDirection="row" color={theme.header}>
        <Paragraph marginTop="none" marginBottom="none">
          {format(new Date(props.frontmatter.date), 'MMMM dd yyyy')}
        </Paragraph>
        <Paragraph
          paddingLeft="xs"
          paddingRight="xs"
          marginTop="none"
          marginBottom="none"
          color={theme.header}
        >
          ~
        </Paragraph>
        <Paragraph marginTop="none" marginBottom="none">
          {props.timeToRead} minute read
        </Paragraph>
      </Box>
    </Box>
  )
}
