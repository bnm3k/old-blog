import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "../style/colors"

const StyledMetaInfo = styled.div`
  font-size: 0.6em;
  margin-top: 5px;
  color: ${colors.textSecondary};
`

const StyledExcerpt = styled.div`
  margin-top: 0;
`

const StyledArticle = styled.article`
  margin-bottom: 40px;
  padding: 10px;
  color: ${colors.textPrimary2};
`

const StyledHR = styled.hr`
  border: 1px dashed #caa4de;
`

const PostPreview = ({ post }) => {
  const {
    timeToRead: t,
    wordCount: { words: w },
    frontmatter,
  } = post
  const { title, slug, excerpt, date, tags } = frontmatter
  const link = `/blog/${slug}`
  return (
    <>
      <StyledArticle>
        <Link to={link}>
          <h1 class="title-header">{title}</h1>
        </Link>
        <StyledMetaInfo>
          <span> Posted on: {date} | </span>
          <span> Word Count: {w} | </span>
          <span> Time to Read: {t} min | </span>
          <span>
            {" "}
            Tagged in:{" "}
            {tags.map((tag, i) => (
              <span key={i}>
                <Link to={`/tag/${tag}/`}>{tag}</Link>
                {", "}
              </span>
            ))}
          </span>
        </StyledMetaInfo>
        <StyledExcerpt>{excerpt}</StyledExcerpt>
      </StyledArticle>
      <StyledHR />
    </>
  )
}

export default PostPreview
