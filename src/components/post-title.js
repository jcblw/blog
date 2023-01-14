import parse from 'date-fns/parse'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Box } from './box'
import { Header1, Paragraph } from './fonts'

export const PostTitle = props => {
  const theme = useTheme()
  const [date] = props.frontmatter.date.split('T')
  return (
    <Box paddingTop="l">
      <Header1 color={theme.link} marginTop="none" marginBottom="s">
        {props.frontmatter.title}
      </Header1>
      <Box display="flex" flexDirection="row" color={theme.header}>
        <Paragraph marginTop="none" marginBottom="none">
          {new Intl.DateTimeFormat().format(
            parse(date, 'yyyy-MM-d', new Date())
          )}
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
