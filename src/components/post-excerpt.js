import parse from 'date-fns/parse'
import { Link } from 'gatsby'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Box } from './box'
import { Header3, Paragraph } from './fonts'
import { HR } from './hr'

export const PostExcerpt = props => {
  const theme = useTheme()
  const [date] = props.frontmatter.date.split('T')
  return (
    <Box paddingTop="m" paddingBottom="m">
      <Link to={props.frontmatter.slug} style={{ textDecoration: 'none' }}>
        <Header3
          color={theme.link}
          marginTop="none"
          marginBottom="none"
          textDecoration="none"
        >
          {props.frontmatter.title}
        </Header3>
      </Link>
      <Paragraph marginTop="none" marginBottom="none">
        {props.frontmatter.description}
      </Paragraph>
      <HR margin="xs" />
      <Box display="flex" flexDirection="row">
        <Paragraph marginTop="none" marginBottom="none" color={theme.header}>
          {new Intl.DateTimeFormat().format(
            parse(date, 'yyyy-MM-d', new Date())
          )}
        </Paragraph>
        <Paragraph
          paddingLeft="xs"
          paddingRight="xs"
          marginTop="none"
          marginBottom="none"
        >
          ᐧ
        </Paragraph>
        <Paragraph marginTop="none" marginBottom="none" color={theme.header}>
          {props.timeToRead} minute read
        </Paragraph>
      </Box>
    </Box>
  )
}
