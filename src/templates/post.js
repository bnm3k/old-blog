import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import useSiteMetadata from "../hooks/useSiteMetadata"

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
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

const PostTemplate = ({ data: { mdx: post }, pageContext }) => {
  const { prev, next } = pageContext
  const { author } = useSiteMetadata()
  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <p>By {author}</p>
      <MDXRenderer>{post.body}</MDXRenderer>
      <PostFooter next={next} prev={prev} />
    </Layout>
  )
}

export default PostTemplate
