import React from "react"
import Layout from "../components/Layout"
import PostList from "../components/PostList"

const HomepageTemplate = ({ pageContext }) => {
  const { posts } = pageContext
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  )
}

export default HomepageTemplate
