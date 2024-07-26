import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Nav from "../components/nav"
import CubeScene from "../components/cube-scene"
import About from "../components/about"
import Skills from "../components/skills"
import Projects from "../components/projects"
import Contact from "../components/contact"
import Footer from "../components/footer"
import "../styles/normalize.scss"
import "../styles/global.scss"
import "../styles/index-page.scss"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Nav />
        <CubeScene />
      <div className="background-overlay"></div>
      <section className="index-hero">
        <h1>Jeremy Gervais</h1>
        <p>Web Developer | UI/UX Designer</p>
        <div id="dots">
          <div id="dot_1" className="dot"></div>
          <div id="dot_2" className="dot"></div>
          <div id="dot_3" className="dot"></div>
        </div>
      </section>
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Jeremy Gervais | Web Developer</title>
    <link rel="canonical" href="https://jeremygervais.ca/" />
    <link rel="icon" href="../images/favicon.ico" />
    <link rel="apple-touch-icon" href="../images/favicon.ico" />
  </>
)
