import React from "react"
import { Link } from "gatsby"

const PostPreview = ({ post }) => {
  const link = `/blog/${post.slug}`
  return (
    <article>
      <Link to={link}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.slug}</p>
      <Link to={link}>read this post</Link>
    </article>
  )
}

export default PostPreview
