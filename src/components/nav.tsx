import * as React from "react"
import resume from "../files/Jeremy Gervais - Resume.pdf"
import "../styles/nav.scss"

const Nav: React.FC = () => {
  return (
    <nav className="top-nav">
      <ul>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact-form">Contact</a></li>
        <li><a href={resume} target="_blank" className="resume-button">Resume</a></li>
      </ul>
    </nav>
  )
}

export default Nav