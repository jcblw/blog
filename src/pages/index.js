import { graphql } from 'gatsby'
import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import { PostExcerpt } from '../components/post-excerpt'
import { SEO } from '../components/seo'
import { getPostData } from '../lib/get-post-data'
import { Header1, Overline, Paragraph } from '../components/fonts'
import { Link } from '../components/link'
import { Box } from '../components/box'
import { GithubRepo } from '../components/github-repo'
import { Icon } from '../components/icon'

const AllPostsTemplate = props => {
  const posts = getPostData(props.data).slice(0, 3)
  const profile = props.data.site.siteMetadata
  const about = props.data.mdx.body
  const featuredProjects = props.data.github.user.pinnedItems.nodes
  const hasPosts = posts.length > 0
  return (
    <>
      <SEO title="Homepage" />
      <Layout location={props.location} noAuthor>
        <>
          <Box
            display="flex"
            css={{
              flexDirection: 'column',
              '@media (min-width: 768px)': {
                flexDirection: 'row',
              },
            }}
          >
            <Box
              flex="0"
              display="flex"
              alignItems="center"
              marginRight="l"
              marginTop="l"
              css={{
                flexDirection: 'row',
                '@media (min-width: 768px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <Box
                Component="img"
                src={profile.avatar}
                alt={profile.author}
                css={{
                  borderRadius: '50%',
                  maxWidth: '67px',
                  marginBottom: 0,
                  '@media (min-width: 768px)': {
                    maxWidth: '120px',
                    marginBottom: '32px',
                  },
                }}
              />
              <Box
                marginTop="zero"
                marginBottom="xxs"
                display="flex"
                paddingLeft="s"
                paddingRight="s"
              >
                <Link href={profile.github} marginRight="s">
                  <Icon iconName="github" width="24" height="24" />
                </Link>
                <Link href={profile.linkedin}>
                  <Icon iconName="linkedin" width="24" height="24" />
                </Link>
              </Box>
            </Box>
            <Box flex="1">
              <MDXRenderer>{about}</MDXRenderer>
            </Box>
          </Box>
          <Overline marginBottom="zero">Latest blog posts</Overline>
          {hasPosts ? (
            posts.map(post => <PostExcerpt key={post.id} {...post} />)
          ) : (
            <Box padding="l">
              <Header1>Not Found</Header1>
              <Paragraph>
                Everything in life is temporary, like this page.
              </Paragraph>
            </Box>
          )}
          <Paragraph marginTop="s">
            <Link href="/blog">View all blog posts</Link>
          </Paragraph>
          <Overline>Featured Projects</Overline>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="spaceBetween"
          >
            {featuredProjects.map(project => (
              <GithubRepo
                key={project.id}
                css={{
                  width: '100%',
                  '@media (min-width: 768px)': {
                    width: 'calc(50% - 16px)',
                  },
                  boxSizing: 'border-box',
                }}
                name={project.nameWithOwner}
                description={project.description}
                starGazers={project.stargazerCount}
                url={project.url}
              />
            ))}
          </Box>
        </>
      </Layout>
    </>
  )
}

export default AllPostsTemplate

export const pageQuery = graphql`
  query allPosts($username: String = "jcblw") {
    allMdx(
      limit: 10
      filter: { frontmatter: { status: { ne: "draft" }, slug: { ne: null } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
            date
            description
          }
          timeToRead
        }
      }
    }
    mdx(parent: { id: { eq: "github_profile_readme_parent" } }) {
      body
    }
    site {
      siteMetadata {
        github
        linkedin
        author
        avatar
      }
    }
    github {
      user(login: $username) {
        login
        url
        pinnedItems(first: 6) {
          nodes {
            ... on GitHub_Repository {
              id
              name
              nameWithOwner
              url
              description
              stargazerCount
            }
          }
        }
        followers {
          totalCount
        }
        following {
          totalCount
        }
      }
    }
  }
`
