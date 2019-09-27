import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const TagTemplate = ({ pageContext }) => {
  const { posts, tag } = pageContext
  return (
    <Layout>
      <h2>Tag Name: {tag}</h2>
      <ul>
        {posts.map((post, i) => {
          const { slug, title } = post.frontmatter
          return (
            <li key={i}>
              <Link to={`/blog/${slug}`}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default TagTemplate
