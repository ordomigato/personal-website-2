import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Contact from "../components/contact"
import Footer from "../components/footer"

import "./project.scss"

// @ts-ignore
export default function Template({ pageContext }) {
  const post = pageContext.data

  return (
    <>
      <div className="project-page-wrapper">
        <Link to="/" className="back-link">
          « Go Back
        </Link>
        <h1>{post.frontmatter.title}</h1>
        <hr className="dot-hr" />
        <div className="project-meta">
          {post.frontmatter.website ? (
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={post.frontmatter.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.frontmatter.website}
              </a>
            </p>
          ) : null}
          {post.frontmatter.code ? (
            <p>
              <strong>Code:</strong>{" "}
              <a
                href={post.frontmatter.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.frontmatter.code}
              </a>
            </p>
          ) : (
            ""
          )}
          {post.frontmatter.api ? (
            <p>
              <strong>3rd Party API:</strong> {post.frontmatter.api}
            </p>
          ) : (
            ""
          )}
          {post.frontmatter.tech ? (
            <ul className="tech-stack">
              {post.frontmatter.tech.map((item: string, i: number) => (
                <li className="tech-stack-item shadow-md" key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div>
          <GatsbyImage
            image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
            objectFit="cover"
            alt={`${post.frontmatter.title} featured image`} />
        </div>
        <div
          className="project-article"
          dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <Contact />
      <Footer />
    </>
  )
}

export const postQuery = graphql`
  query MyQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        api
        code
        path
        tech
        title
        website
        featuredImage {
          childImageSharp {
            gatsbyImageData(height: 600)
          }
        }
      }
      html
    }
  }
`
