const mdxFeed = require('gatsby-plugin-mdx/feed')

const layout = require.resolve('./src/components/layout.js')

module.exports = {
  siteMetadata: {
    title: 'Human tech.',
    description: 'Personal blog of Jacob Lowe',
    siteUrl: 'https://jcbl.ws',
    author: 'Jacob Lowe',
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
        extensions: ['.mdx', '.md'],
        defaultLayouts: { default: layout },
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: mdxFeed,
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/blog`,
        name: 'blog',
      },
    },
    // 'gatsby-plugin-emotion',
  ],
}
