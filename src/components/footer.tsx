import React from "react"
import BehanceSVG from "../images/svg/behance.svg"
import InstagramSVG from "../images/svg/instagram.svg"
import LinkedinSVG from "../images/svg/linkedin.svg"
import GithubSVG from "../images/svg/github.svg"
import "../styles/footer.scss"

const Footer = () => {
  return (
    <footer className="footer_section">
      <section className="social-media flex flex-col align-center text-center">
        <a
          href="https://www.linkedin.com/in/jeremy-gervais/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinSVG />
        </a>
        <a
          href="https://www.instagram.com/fakiescript/"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramSVG />
        </a>
        <a
          href="https://github.com/ordomigato"
          target="_blank"
          rel="noreferrer"
        >
          <GithubSVG />
        </a>
        <a
          href="https://www.behance.net/fakiescript"
          target="_blank"
          rel="noreferrer"
        >
          <BehanceSVG />
        </a>
      </section>
      <p>Website Designed by Jeremy Gervais</p>
    </footer>
  )
}

export default Footer
