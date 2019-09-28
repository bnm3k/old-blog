import React from "react"
import Header from "./Header"
import Helmet from "react-helmet"
import useSiteMetadata from "../hooks/useSiteMetadata"
import { Global, css } from "@emotion/core"

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
            background-color: #dfdbe5;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
            margin: 0;
            color: black;
            font-family: "Merriweather", serif, -apple-system,
              BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-size: 16px;
            line-height: 1.4;

            /* remove margin for the main div that Gatsby mounts into */
            > div {
              margin-top: 0;
            }
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: #403f3f;
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
            color: #222;
          }

          .title-header {
            padding: 0 0 4px;
            border-bottom: 5px dashed #caa4de;
            display: inline-block;
          }
          .title-header:hover {
            color: #a17ebf;
          }

          a {
            color: #a17ebf;
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
