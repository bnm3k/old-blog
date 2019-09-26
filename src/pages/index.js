import React from "react"
import Layout from "../components/layout"
import usePosts from "../hooks/usePosts"
import PostPreview from "../components/PostPreview"

export default () => {
  const posts = usePosts()

  return (
    <Layout>
      <h1>Nagamocha!</h1>
      <h2>blog</h2>
      {posts.map(post => (
        <pre key={post.slug}>
          <PostPreview post={post} />
        </pre>
      ))}
    </Layout>
  )
}
