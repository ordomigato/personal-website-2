import React from "react"

import "../styles/about.scss"

const About = () => {

  const yearsExperience = `${new Date().getFullYear() - 2020}`

  return (
    <section className="about-section">
      <div className="about-container">
        <p>
          Full stack (primarily frontend) developer with { yearsExperience }+ years of professional experience designing,
          building and maintaining websites and web applications.
        </p>
        <br />
        <p>When the plants are watered &#127793; and the tea is brewed &#127861; it's time to get to work &#128187;</p>
        <hr className="about-hr" />
      </div>
    </section>
  )
}

export default About
