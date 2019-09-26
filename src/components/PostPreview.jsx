import React from "react"
import { Link } from "gatsby"

const PostPreview = ({ post }) => (
  <article>
    <Link to={`blog/${post.slug}`}>
      <h2>{post.title}</h2>
    </Link>
    <p>{post.slug}</p>
    <Link to={post.slug}>read this post</Link>
  </article>
)

export default PostPreview
