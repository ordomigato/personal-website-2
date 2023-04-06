import React, { useEffect } from "react"
import { useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, getImageData, getSrc , IGatsbyImageData } from "gatsby-plugin-image"
import { Link } from "gatsby"
import gsap, { Back } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { graphql } from "gatsby"
import Github from "../images/svg/github-brands.svg"
import "../styles/projects.scss"


gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  useEffect(() => {
    gsap.to(".project", {
      opacity: 1,
      duration: 0.7,
      scale: 1,
      y: -100,
      ease: Back.easeOut,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".project",
        end: "bottom 20%",
        start: "top 80%",
        toggleActions: "play play resume reverse",
      },
    })
  }, [])

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: {frontmatter: {path: ASC}}) {
        edges {
          node {
            frontmatter {
              path
              title
              website
              code
              featuredImage {
                childImageSharp {
                  gatsbyImageData(height: 800)
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <section id="projects" className="recent-work_section">
      <h2>My Recent Work</h2>
      <p>See either the live project or code repository</p>
      <div className="projects container">
        {data.allMarkdownRemark.edges.map((edge: any) => {
          return (
            <article
              className="project"
              key={edge.node.frontmatter.title}
            >
              <div className="overlay">
                {edge.node.frontmatter.website && (
                  <a
                    href={edge.node.frontmatter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Site
                  </a>
                )}
                <Link to={edge.node.frontmatter.path} state={{ modal: true }}>
                  Case Study
                </Link>
              </div>
              <GatsbyImage
                image={
                  edge.node.frontmatter.featuredImage.childImageSharp.gatsbyImageData
                }
                // style={{ position: "absolute" }}
                alt={`${edge.node.frontmatter.title} featured image`}
              />
              <header className="project-header">
                <h3 className="project-title">{edge.node.frontmatter.title}</h3>
                {edge.node.frontmatter.code !== "" ? (
                  <ul className="project-links">
                    <li className="project-link">
                      <a
                        href={edge.node.frontmatter.code}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github />
                      </a>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </header>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
