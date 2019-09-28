import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"

const AllTagsTemplate = ({ pageContext }) => {
  const { tags } = pageContext
  return (
    <Layout>
      <h1>All Tags</h1>
      <div>
        {tags.map(tag => (
          <div key={tag}>
            <Link to={`/tag/${tag}`}>{tag}</Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default AllTagsTemplate
