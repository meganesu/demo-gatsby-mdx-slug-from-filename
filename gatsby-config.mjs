/**
 * @type {import('gatsby').GatsbyConfig}
 */
export default {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-mdx",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./blog",
      },
    },
  ]
};