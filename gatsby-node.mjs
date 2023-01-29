import slugify from "@sindresorhus/slugify"

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
