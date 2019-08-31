import { Box } from '@mujo/box'
import format from 'date-fns/format'
import React from 'react'
import { Header1, Paragraph } from './fonts'

export const PostTitle = props => (
  <Box paddingTop="l" paddingBottom="m">
    <Header1 color="java" marginTop="none" marginBottom="s">
      {props.frontmatter.title}
    </Header1>
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
  </Box>
)
