import { Box } from '@mujo/box'
import React from 'react'
import { Header3, Paragraph } from './fonts'

export const PostExcerpt = props => (
  <Box paddingTop="l" paddingBottom="l">
    <Header3
      href={props.frontmatter.slug}
      Component="a"
      color="java"
      marginTop="none"
      marginBottom="none"
    >
      {props.frontmatter.title}
    </Header3>
    <Box display="flex" direction="row" color="polar">
      <Paragraph marginTop="none" marginBottom="none">
        {props.frontmatter.date}
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
