module.exports = {
  siteMetadata: {
    title: "nagamocha",
    description: "blog...",
    author: "bnm",
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/content/posts`,
      },
    },
  ],
}
