import React from "react"
import Header from "./Header"
import Helmet from "react-helmet"
import useSiteMetadata from "../hooks/useSiteMetadata"
import { Global, css } from "@emotion/core"
import colors from "../style/colors"

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
          }

          /* More info: https://bit.ly/2PsCnzk */
          * + * {
            margin-top: 1rem;
          }

          html,
          body {
            background-color: ${colors.backgroundColor};
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");

            margin: 0;
            color: ${colors.textPrimary};
            font-family: "Merriweather", serif, -apple-system,
              BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-size: 18px;
            letter-spacing: 0.03em;
            line-height: 2.3;
            /*credits for blockquote style: https://css-tricks.com/snippets/css/simple-and-nice-blockquote-styling/*/
            blockquote {
              border-radius: 10px;
              color: ${colors.textPrimary};
              background: ${colors.textSecondary};
              border-left: 10px solid ${colors.primary};
              margin: 1.5em 10px;
              padding: 0.5em 10px;
            }

            blockquote:before {
              color: ${colors.primary};
              content: open-quote;
              font-size: 4em;
              line-height: 0.1em;
              margin-right: 0.25em;
              vertical-align: -0.4em;
            }

            blockquote p {
              display: inline;
            }

            /* remove margin for the main div that Gatsby mounts into */
            > div {
              margin-top: 0;
              margin-left: 15px;
              margin-right: 5px;
            }
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: ${colors.textHeaders};
            line-height: 1.1;
            font-family: Montserrat, "Arial Black", Gadget, sans-serif;
            font-size: 20px;
            font-weight: 900;
            font-kerning: normal;
            font-optical-sizing: auto;
            font-stretch: 100%;
            font-size-adjust: none;

            + * {
              margin-top: 0.5rem;
            }
          }
          h1 {
            font-size: 28px;
          }

          strong {
            color: ${colors.emphasis};
          }

          .title-header {
            padding: 0 0 4px;
            border-bottom: 5px dashed ${colors.primary};
            display: inline-block;
          }
          .title-header:hover {
            color: ${colors.textLink};
          }

          a {
            color: ${colors.textLink};
          }

          li {
            margin-top: 0.25rem;
          }
        `}
      />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat:900|Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <main
        css={css`
          margin: 2rem auto;
          max-width: 700px;
        `}
      >
        {children}
      </main>
    </>
  )
}

export default Layout
