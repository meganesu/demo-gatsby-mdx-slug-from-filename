import React from "react"
import { graphql } from "gatsby"

import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`

const BlogPost = ({ data, children }) => {
  return (
    <Layout>
      <h1>{data.mdx.frontmatter.title}</h1>
      <p>{data.mdx.frontmatter.date}</p>
      <MDXProvider>{children}</MDXProvider>
    </Layout>
  )
}

export default BlogPost
