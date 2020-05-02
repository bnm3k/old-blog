require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteTitle: `Nagamocha`,
    siteTitleAlt: `Nagamocha`,
    siteHeadline: `...`,
    siteUrl: `https://www.nagamocha.dev`,
    siteDescription: `writing as I learn along. Learning as I write along`,
    siteLanguage: `en`,
    siteImage: `/icon.png`,
    author: `@nagamocha3000`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        formatString: "YYYY",
        showLineNumbers: false,
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
          {
            title: `Misc`,
            slug: `/misc`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nagamocha blog`,
        short_name: `Nagamocha`,
        description: `Nagamocha`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icon: `static/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `source sans pro\:300,400,400i,700`,
          `source serif pro\:100,400,400i,700`,
        ],
        display: "swap",
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
};
