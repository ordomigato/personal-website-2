import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Nav from "../components/nav"
import CubeScene from "../components/cube-scene"
import About from "../components/about"
import Skills from "../components/skills"
import "../styles/normalize.scss"
import "../styles/global.scss"
import "../styles/index-page.scss"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Nav />
      <CubeScene />
      <section className="index-hero">
        <h1>Jeremy Gervais</h1>
        <p>Web Developer | UI/UX Designer</p>
        <div id="dots">
          <div id="dot_1" className="dot"></div>
          <div id="dot_2" className="dot"></div>
          <div id="dot_3" className="dot"></div>
          <div id="dot_4" className="dot"></div>
          <div id="dot_5" className="dot"></div>
        </div>
      </section>
      <section>
        <About />
      </section>
      <section>
        <Skills />
      </section>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Jeremy Gervais | Web Developer</title>
