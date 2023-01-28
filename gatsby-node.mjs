import slugify from "@sindresorhus/slugify"

export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    createNodeField({
      node,
      name: "slug",
      value: `/${slugify(node.frontmatter.title)}`,
    })
  }
}
