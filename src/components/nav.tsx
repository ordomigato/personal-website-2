import * as React from "react"
import "../styles/nav.scss"

const Nav: React.FC = () => {
  return (
    <nav className="top-nav">
      <ul>
        <li><a href="#">Skills</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
        <li><button>Resume</button></li>
      </ul>
    </nav>
  )
}

export default Nav