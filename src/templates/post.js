import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      timeToRead
      wordCount {
        words
      }
      frontmatter {
        title
        tags
      }
      body
    }
  }
`

const PostFooter = ({ next, prev }) => (
  <>
    <Link to="/">&larr; home</Link>
    <br />
    {next && (
      <>
        <Link to={`/blog/${next.frontmatter.slug}`}>
          Next Post: {next.frontmatter.title}
        </Link>{" "}
        <br />{" "}
      </>
    )}
    {prev && (
      <>
        <Link to={`/blog/${prev.frontmatter.slug}`}>
          Previous Post: {prev.frontmatter.title}
        </Link>{" "}
        <br />{" "}
      </>
    )}
  </>
)
const Tags = ({ tags }) => (
  <div>
    {tags.length > 1 ? "tags: " : "tag: "}
    {tags.map((tag, i) => (
      <span key={i}>
        <Link to={`/tag/${tag}`}>{tag}</Link>
        {i === tags.length - 1 ? null : " , "}
      </span>
    ))}
  </div>
)

const MetaInfo = ({ timeToRead: t, words: w }) => (
  <div>
    <span>{`${t} min read: ${w} words`}</span>
  </div>
)

const PostTemplate = ({ data: { mdx: post }, pageContext }) => {
  const { prev, next, slug } = pageContext
  const {
    timeToRead,
    body,
    frontmatter: { title, tags },
    wordCount: { words },
  } = post
  return (
    <Layout>
      <Link to={`/blog/${slug}`}>
        <h1 class="title-header">{title}</h1>
      </Link>
      {tags && <Tags tags={tags} />}
      <MetaInfo timeToRead={timeToRead} words={words} />
      <MDXRenderer>{body}</MDXRenderer>
      <PostFooter next={next} prev={prev} />
    </Layout>
  )
}

export default PostTemplate
