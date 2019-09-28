import React from "react"
import Layout from "../components/Layout"
import PostPreview from "../components/PostPreview"
import { Link, graphql } from "gatsby"

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        timeToRead
        wordCount {
          words
        }
        frontmatter {
          title
          slug
          excerpt
          date
        }
      }
    }
  }
`

export default ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <div>
        <Link to={"/tags"}> All tags</Link>
      </div>
      {posts.map((post, i) => (
        <PostPreview key={i} post={post} />
      ))}
    </Layout>
  )
}
