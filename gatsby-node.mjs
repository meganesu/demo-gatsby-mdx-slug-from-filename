import slugify from "@sindresorhus/slugify"
import path from "path"

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    createNodeField({
      node,
      name: "slug",
      value: `/${slugify(getNode(node.parent).name)}`,
    })
  }
}

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for MDX nodes in the /blog/ directory
  const result = await graphql(
    `
      {
        allMdx(
          filter: {
            internal: {
              # Example contentFilePath values:
              # For local development: /Users/megansullivan/Documents/personal-projects/personal-site-v2/blog/managing-focus-with-react-and-jest/index.mdx
              # On Netlify: /opt/build/repo/blog/why-use-graphql-sketchnote/index.mdx
              contentFilePath: { regex: "//blog//" }
            }
          }
        ) {
          nodes {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query to create pages for MDX blog posts.`)
    return
  }

  // Create pages for each MDX file
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  result.data.allMdx.nodes.forEach(node => {
    console.log("NODE", node)
    const slug = node.fields.slug

    createPage({
      path: `${slug}`,
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      }
    })
  })
}