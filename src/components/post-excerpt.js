import format from 'date-fns/format'
import { Link } from 'gatsby'
import React from 'react'
import { Box } from './box'
import { Header3, Paragraph } from './fonts'
import { HR } from './hr'

export const PostExcerpt = props => (
  <Box paddingTop="m" paddingBottom="m">
    <Link to={props.frontmatter.slug} style={{ textDecoration: 'none' }}>
      <Header3
        color="periwinkleGray"
        marginTop="none"
        marginBottom="none"
        textDecoration="none"
      >
        {props.frontmatter.title}
      </Header3>
    </Link>
    <Paragraph marginTop="none" marginBottom="none" color="white">
      {props.frontmatter.description}
    </Paragraph>
    <HR margin="xs" />
    <Box display="flex" flexDirection="row">
      <Paragraph marginTop="none" marginBottom="none" color="aeroBlue">
        {format(new Date(props.frontmatter.date), 'MMMM dd yyyy')}
      </Paragraph>
      <Paragraph
        paddingLeft="xs"
        paddingRight="xs"
        marginTop="none"
        marginBottom="none"
        color="vulcan"
      >
        ᐧ
      </Paragraph>
      <Paragraph marginTop="none" marginBottom="none" color="aeroBlue">
        {props.timeToRead} minute read
      </Paragraph>
    </Box>
  </Box>
)
