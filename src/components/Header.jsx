import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import Emoji from "./Emoji"
import useSiteMetadata from "../hooks/useSiteMetadata"
import colors from "../style/colors"

const NavLink = styled(Link)`
  color: ${colors.textPrimary2};
  font-size: 1rem;
  font-weight: ${props => props.fontWeight || "normal"};
  line-height: 1;
  margin: 0 0.5rem 0 0;
  padding: 0.25rem;
  text-decoration: none;

  &.current-page {
    border-bottom: 2px solid ${colors.primary};
  }

  nav &:hover {
    border-bottom: 3px solid ${colors.emphasis};
  }
  &:last-of-type {
    margin-right: 0;
  }
`

const Header = () => {
  const { title } = useSiteMetadata()
  return (
    <header
      css={css`
        background-color: ${colors.backgroundColor};
        background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
        border-bottom: 3px dashed ${colors.primary};
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        padding: 0.5rem calc((100vw - 550px - 0.5rem) / 2);
      `}
    >
      <NavLink to="/" fontWeight="bold">
        <Emoji sym="☕️" /> {title}
      </NavLink>
      <nav
        css={css`
          margin-top: 0;
        `}
      >
        <NavLink to="/" activeClassName="current-page">
          Home
        </NavLink>
        <NavLink to="/about/" activeClassName="current-page">
          About
        </NavLink>
        <NavLink to="/contact/" activeClassName="current-page">
          Contact
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
