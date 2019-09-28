import React from "react"
import { Link } from "gatsby"

const PostPreview = ({ post }) => {
  const { timeToRead, wordCount, frontmatter } = post
  const { title, slug, excerpt, date } = frontmatter
  const link = `/blog/${slug}`
  return (
    <article>
      <Link to={link}>
        <h1 class="title-header">{title}</h1>
      </Link>
      <p>Excerpt: {excerpt}</p>
      <p>Date: {date}</p>
      <p>Word Count: {wordCount.words}</p>
      <p>Time to Read: {timeToRead}</p>
      <Link to={link}>read this post</Link>
    </article>
  )
}

export default PostPreview
