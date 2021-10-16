module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'Online Auction FE',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [`/category/*`, `/admin/*`, `/seller/*`, `/product/*`],
      },
    },
  ],
};
