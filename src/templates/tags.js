import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const AllTagsTemplate = ({ pageContext }) => {
  const { tags } = pageContext
  return (
    <Layout>
      <ul>
        {tags.map(tag => (
          <li key={tag}>
            <Link to={`/tag/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default AllTagsTemplate
