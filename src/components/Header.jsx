import React from "react"
import useSiteMetadata from "../hooks/useSiteMetadata"

const Header = () => {
  const { title, description } = useSiteMetadata()

  return (
    <header>
      <span>{title}</span>| <span> {description}</span>
    </header>
  )
}

export default Header
