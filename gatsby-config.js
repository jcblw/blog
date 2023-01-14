// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: `.env`,
})

const layout = require.resolve('./src/components/layout.js')

module.exports = {
  siteMetadata: {
    title: 'jcblw',
    description: 'Blog of Jacob Lowe',
    siteUrl: 'https://jcbl.ws',
    github: 'https://github.com/jcblw',
    linkedin: 'https://www.linkedin.com/in/%F0%9F%8C%BF-jacob-lowe-50a49126/',
    author: 'Jacob Lowe',
    aboutAuthor: 'I am a founder of Mujō.',
    avatar: 'https://avatars1.githubusercontent.com/u/578259?s=460&v=4',
    primaryColor: '#516473',
    secondaryColor: '#3D474F',
    source: 'https://github.com/jcblw/blog',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        display: 'minimal-ui',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 1200, withWebp: true, tracedSVG: true },
          },
          'gatsby-remark-autolink-headers',
        ],
        extensions: ['.mdx', '.md'],
        defaultLayouts: { default: layout },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-54359707-1',
        head: false,
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    },
    // TODO: try this again with latest version after this is merged
    // https://github.com/emotion-js/emotion/pull/1485
    // 'gatsby-plugin-emotion',
  ],
}
