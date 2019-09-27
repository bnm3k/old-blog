import React from "react"

const EmbeddedYoutubeVideo = ({ src, title = "" }) => {
  src = src.replace("watch?v=", "embed/")
  return (
    <iframe
      title={title}
      width="560"
      className="lazyload"
      height="315"
      src={src}
      frameborder="0"
      allowfullscreen
    ></iframe>
  )
}
export default EmbeddedYoutubeVideo
