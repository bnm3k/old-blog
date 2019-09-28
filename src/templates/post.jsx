import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"
import styled from "@emotion/styled"
import Emoji from "../components/Emoji"
import colors from "../style/colors"

const StyledNext = styled.div`
  float: right;
  margin: 0;
`

const StyledPrev = styled.div`
  float: left;
  text-decoration: none;
  margin: 0;
`

const StyledPageSuggestion = styled.div`
  display: block;
  height: 40px;
`

const HomePageSection = styled.div`
  background-color: ${colors.secondary};
  color: ${colors.textPrimary2};
  border-radius: 10px;
  height: 30px;
  line-height: 30px;
  display: block;
  clear: left;
  text-align: center;
  &:hover {
    background-color: ${colors.textPrimary2};
    color: ${colors.secondary};
    cursor: pointer;
  }
`

const PostFooter = ({ next, prev }) => (
  <>
    <StyledPageSuggestion>
      {next && (
        <StyledNext>
          <Link to={`/blog/${next.frontmatter.slug}`}>
            | Next Post: {next.frontmatter.title} &rarr;
          </Link>
        </StyledNext>
      )}
      {prev && (
        <StyledPrev>
          <Link to={`/blog/${prev.frontmatter.slug}`}>
            &larr; Previous Post: {prev.frontmatter.title} |
          </Link>
        </StyledPrev>
      )}
    </StyledPageSuggestion>
    <Link to="/">
      <HomePageSection>
        <Emoji sym="🏠" />
        Home
      </HomePageSection>
    </Link>
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

const MetaInfo = ({ timeToRead: t, words: w }) => {
  let SyledDiv = styled.div`
    font-size: 0.7em;
  `
  return (
    <SyledDiv>
      <span>{`${t} min read ⏳ |   ${w} words 📖`}</span>
    </SyledDiv>
  )
}

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
      <MetaInfo timeToRead={timeToRead} words={words} />
      {tags && <Tags tags={tags} />}
      <MDXRenderer>{body}</MDXRenderer>
      <PostFooter next={next} prev={prev} />
    </Layout>
  )
}

export default PostTemplate
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
