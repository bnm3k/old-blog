module.exports = {
  siteMetadata: {
    title: "nagamocha",
    description: "blog...",
    author: "bnm",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
        plugins: [
          "gatsby-remark-smartypants",
          "gatsby-plugin-catch-links",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              showLineNumbers: true,
              aliases: {},
            },
          },
        ],
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
