import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout/"

const Blog = ({ data }) => {
  const allPosts = data.allMdx.nodes

  return (
    <Layout>
      <h1>Blog</h1>
      <ul>
        {allPosts.map((node) => (
          <li>
            <Link to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx(
      sort: { frontmatter: { date: DESC } }
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
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`

export default Blog
