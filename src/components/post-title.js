import format from 'date-fns/format'
import React from 'react'
import { Box } from './box'
import { Header1, Paragraph } from './fonts'

export const PostTitle = props => (
  <Box paddingTop="l">
    <Header1 color="hitPink" marginTop="none" marginBottom="s">
      {props.frontmatter.title}
    </Header1>
    <Box display="flex" flexDirection="row" color="linen">
      <Paragraph marginTop="none" marginBottom="none">
        {format(new Date(props.frontmatter.date), 'MMMM dd yyyy')}
      </Paragraph>
      <Paragraph
        paddingLeft="xs"
        paddingRight="xs"
        marginTop="none"
        marginBottom="none"
        color="hitPink"
      >
        ~
      </Paragraph>
      <Paragraph marginTop="none" marginBottom="none">
        {props.timeToRead} minute read
      </Paragraph>
    </Box>
  </Box>
)
