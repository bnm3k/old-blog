module.exports = {
  siteMetadata: {
    title: "nagamocha",
    description: "blog...",
    author: "bnm",
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.jsx"),
        },
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          "gatsby-remark-smartypants",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-responsive-iframe",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: "›",
              showLineNumbers: true,
              aliases: { md: "markup", mdx: "markup" },
            },
          },
        ],
        plugins: [
          { resolve: "gatsby-remark-images" },
          "gatsby-plugin-catch-links",
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
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-webpack-bundle-analyzer",
      options: {
        production: true,
        disable: !process.env.ANALYZE_BUNDLE_SIZE,
        generateStatsFile: true,
        analyzerMode: "static",
      },
    },
  ],
}
