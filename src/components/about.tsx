import React from "react"

import "../styles/about.scss"

const About = () => {

  const yearsExperience = `${new Date().getFullYear() - 2020}`

  return (
    <section className="about-section">
      <div className="about-container">
        <p>
          Web developer with { yearsExperience }+ years of professional experience designing,
          building and maintaining websites and SaaS applications.
        </p>
        <hr className="about-hr" />
      </div>
    </section>
  )
}

export default About
