const getPosts = async (graphql, reporter) => {
  let posts = null
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
            title
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
      component: require.resolve("./src/templates/post.js"),
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
    component: require.resolve("./src/templates/tags.js"),
    context: {
      tags: tags.sort(),
    },
  })

  //create page per tag, each tag page displays posts under that tag
  tags.forEach(tag => {
    const posts = postsByTag[tag]
    createPage({
      path: `/tag/${tag}`,
      component: require.resolve("./src/templates/tag.js"),
      context: {
        posts,
        tag,
      },
    })
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const posts = await getPosts(graphql, reporter)
  createBlogPostPages(actions.createPage, posts)
  createTagPages(actions.createPage, posts)
}
