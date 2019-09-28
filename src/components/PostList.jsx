import React from "react"
import PostPreview from "./PostPreview"
import { Link } from "gatsby"

const PostList = ({ posts }) => (
  <>
    {posts.map((post, i) => (
      <PostPreview key={i} post={post} />
    ))}
    <div>
      <Link to={"/tags"}> All tags</Link>
    </div>
  </>
)

export default PostList
