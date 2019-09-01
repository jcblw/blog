const layout = require.resolve('./src/components/layout.js')

module.exports = {
  siteMetadata: {
    title: 'Human tech.',
    description: 'Personal blog of Jacob Lowe',
    siteUrl: 'https://jcbl.ws',
    author: 'Jacob Lowe',
    aboutAuthor: [
      'I am an engineer and the CEO of Mujo LLC. ',
      'I believe that tech should be more human and ',
      'allow humans to better there lives',
    ].join(''),
    avatar: 'https://avatars1.githubusercontent.com/u/578259?s=460&v=4',
    primaryColor: '#3C3736',
    secondaryColor: '#11C2AF',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/blog`,
        name: 'blog',
      },
    },
    // TODO: try this again with latest version after this is merged
    // https://github.com/emotion-js/emotion/pull/1485
    // 'gatsby-plugin-emotion',
  ],
}
