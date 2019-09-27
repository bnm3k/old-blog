import React from "react"
import Layout from "../components/layout"
import usePosts from "../hooks/usePosts"
import PostPreview from "../components/PostPreview"
import { Link } from "gatsby"

export default () => {
  const posts = usePosts()

  return (
    <Layout>
      <div>
        <Link to={"/tags"}> All tags</Link>
      </div>
      {posts.map(post => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </Layout>
  )
}
