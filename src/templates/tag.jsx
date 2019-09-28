import React from "react"
import Layout from "../components/Layout"
import PostList from "../components/PostList"

const TagTemplate = ({ pageContext }) => {
  const { posts, tag } = pageContext
  return (
    <Layout>
      <h1>Tag: {tag}</h1>
      <PostList posts={posts} />
    </Layout>
  )
}

export default TagTemplate
