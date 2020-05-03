import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Highlight } from './highlight'

export const Author = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            aboutAuthor
            avatar
          }
        }
      }
    `
  )

  return (
    <Highlight
      image={site.siteMetadata.avatar}
      title={site.siteMetadata.author}
      description={site.siteMetadata.aboutAuthor}
      imageAlt="Jacob Lowe"
      round
      design="dark"
    />
  )
}
