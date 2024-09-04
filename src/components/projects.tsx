import React, { useEffect, useState } from "react"
import { useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import gsap, { Back } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { graphql } from "gatsby"
import Github from "../images/svg/github.svg"
import "../styles/projects.scss"

type TProjectType = "Website" | "Web App" | "Design"


gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const [filteredProjectType, setFilteredProjectType] = useState("")

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
  }, [filteredProjectType])

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: {frontmatter: {path: ASC}}) {
        edges {
          node {
            frontmatter {
              path
              title
              type
              website
              code
              featuredImage {
                childImageSharp {
                  gatsbyImageData(height: 600)
                }
              }
            }
          }
        }
      }
    }
  `)

  const handleProjectTypeSelect = (skill: TProjectType | '') => {
    setFilteredProjectType(skill)
  }

  return (
    <section id="projects" className="recent-work_section">
      <h2>Projects</h2>
      <p>See either the live project or code repository of some of my work.</p>
      <div className="project-types">
      <span onClick={() => handleProjectTypeSelect("")} className={`project-type ${[''].includes(filteredProjectType) ? 'selected' : ''}`}>All</span>
        <span onClick={() => handleProjectTypeSelect("Web App")} className={`project-type ${['' || 'Web App'].includes(filteredProjectType) ? 'selected' : ''}`}>Web Apps</span>
        <span onClick={() => handleProjectTypeSelect("Website")} className={`project-type ${['' || 'Website'].includes(filteredProjectType) ? 'selected' : ''}`}>Websites</span>
        <span onClick={() => handleProjectTypeSelect("Design")} className={`project-type ${['' || 'Design'].includes(filteredProjectType) ? 'selected' : ''}`}>Designs</span>
      </div>
      <div className="projects container">
        {data.allMarkdownRemark.edges.filter((edge: any) => filteredProjectType.includes(edge.node.frontmatter.type) || filteredProjectType === '').map((edge: any) => {
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
                  Overview
                </Link>
              </div>
              <GatsbyImage
                image={
                  edge.node.frontmatter.featuredImage.childImageSharp.gatsbyImageData
                }
                objectFit="cover"
                // style={{ position: "absolute" }}
                alt={`${edge.node.frontmatter.title} featured image`}
              />
              <header className="project-header">
                <h3 className="project-title">{edge.node.frontmatter.title}</h3>
                <div className="project-types">
                  <span className="project-type">{edge.node.frontmatter.type[0]}</span>
                </div>
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
