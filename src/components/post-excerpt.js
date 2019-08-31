import { Box } from '@mujo/box'
import format from 'date-fns/format'
import { Link } from 'gatsby'
import React from 'react'
import { Header3, Paragraph } from './fonts'

export const PostExcerpt = props => (
  <Box paddingTop="l" paddingBottom="l">
    <Link to={props.frontmatter.slug} style={{ textDecoration: 'none' }}>
      <Header3
        color="java"
        marginTop="none"
        marginBottom="none"
        textDecoration="none"
      >
        {props.frontmatter.title}
      </Header3>
    </Link>
    <Box display="flex" direction="row" color="polar">
      <Paragraph marginTop="none" marginBottom="none">
        {format(new Date(props.frontmatter.date), 'MMMM dd yyyy')}
      </Paragraph>
      <Paragraph
        paddingLeft="xs"
        paddingRight="xs"
        marginTop="none"
        marginBottom="none"
        color="java"
      >
        ~
      </Paragraph>
      <Paragraph marginTop="none" marginBottom="none">
        {props.timeToRead} minute read
      </Paragraph>
    </Box>
    <Paragraph marginTop="s" marginBottom="none">
      {props.frontmatter.description}
    </Paragraph>
  </Box>
)
