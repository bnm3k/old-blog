const getPosts = async (graphql, reporter) => {
  let posts = null
  const result = await graphql(`
    {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        nodes {
          timeToRead
          wordCount {
            words
          }
          frontmatter {
            title
            slug
            excerpt
            date
            tags
          }
        }
      }
    }
  `)
  if (result.errors) reporter.panic("failed to create posts", result.errors)
  else posts = result.data.allMdx.nodes

  return posts
}
const createBlogPostPages = async (createPage, posts) => {
  //create page for each blog post
  posts.forEach((post, i) => {
    createPage({
      path: `/blog/${post.frontmatter.slug}`,
      component: require.resolve("./src/templates/post.jsx"),
      context: {
        slug: post.frontmatter.slug,
        next: i === 0 ? null : posts[i - 1],
        prev: i === posts.length - 1 ? null : posts[i + 1],
      },
    })
  })
}

const createTagPages = (createPage, posts) => {
  const postsByTag = {}

  posts.forEach(post => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) postsByTag[tag] = []
        postsByTag[tag].push(post)
      })
    }
  })

  const tags = Object.keys(postsByTag)

  //create page displaying all tags
  createPage({
    path: "/tags",
    component: require.resolve("./src/templates/tags.jsx"),
    context: {
      tags: tags.sort(),
    },
  })

  //create page per tag, each tag page displays posts under that tag
  tags.forEach(tag => {
    const posts = postsByTag[tag]
    createPage({
      path: `/tag/${tag}`,
      component: require.resolve("./src/templates/tag.jsx"),
      context: {
        posts,
        tag,
      },
    })
  })
}

const createHomePage = (createPage, posts) => {
  createPage({
    path: `/`,
    component: require.resolve("./src/templates/homepage.jsx"),
    context: { posts },
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const posts = await getPosts(graphql, reporter)
  createHomePage(actions.createPage, posts)
  createBlogPostPages(actions.createPage, posts)
  createTagPages(actions.createPage, posts)
}
