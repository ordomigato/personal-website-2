import React, { useRef, useEffect, MutableRefObject } from "react"
import gsap, { Back } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Uiux from "../images/svg/uiux.svg"
import WebDev from "../images/svg/webdev.svg"
import Design from "../images/svg/design.svg"
import "../styles/skills.scss"

gsap.registerPlugin(ScrollTrigger)

const Skills: React.FC = () => {
  let skillsSectionRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    gsap.to(skillsSectionRef, {
      opacity: 1,
      duration: 0.7,
      scale: 1,
      y: -100,
      ease: Back.easeOut,
      scrollTrigger: {
        // @ts-ignore
        trigger: skillsSectionRef,
        end: "bottom 20%",
        start: "top 80%",
        toggleActions: "play play resume reverse",
      },
    })
  }, [])

  return (
    <div>
      <section id="skills" className="skills-section">
        <div
          className="skills-container container mx-auto"
          ref={el => {
            // @ts-ignore
            skillsSectionRef = el
          }}
        >
          <article className="uiux_skills skill-wrapper">
            <header>
              <Uiux />
              <h2 className="skill-title">Front-End Development</h2>
            </header>
            <div className="skill-body">
              <p className="skill-overview">
                Modern, eye-catching, and
                easy-to-use.
              </p>
              <hr className="skill-hr" />
              <div className="skill-subsection">
                <p className="skill-subsection_title">Frameworks / Libraries</p>
                <div className="skill-subsection_items">
                  <p>
                    React | Vue | Gatsby | Nuxt | Lit Element | Redux | Vuex | ThreeJS | GSAP | jQuery
                  </p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">
                  CSS Framework & Technologies
                </p>
                <div className="skill-subsection_items">
                  <p>
                    Bootstrap | Tailwind | Material UI | Font Awesome
                  </p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">UI / UX Tools</p>
                <ul className="skill-subsection_items">
                  <li>Figma</li>
                  <li>Adobe Creative Suite ( PS | AI | XD )</li>
                  <li>Pen & Paper</li>
                </ul>
              </div>
            </div>
          </article>
          <article className="web-dev_skills skill-wrapper">
            <header>
              <WebDev />
              <h2 className="skill-title">Website Development</h2>
            </header>
            <div className="skill-body">
              <p className="skill-overview">
                From client-friendly WYSIWYG to fully custom software.
              </p>
              <hr className="skill-hr" />
              <div className="skill-subsection">
                <p className="skill-subsection_title">Languages</p>
                <div className="skill-subsection_items">
                  <p>HTML | CSS | SASS | JavaScript | Typescript | Golang | C# | JSON | XML | Markdown</p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">Development Tools</p>
                <div className="skill-subsection_items">
                  <p>Git | Github | Gitlab | Docker | WSL | Asana | Jira | Confluence | Trello</p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">Testing/QA</p>
                <div className="skill-subsection_items">
                  <p>Jest | Mocha | Chai | Sinon | Playwright | Selenium</p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">Integrations</p>
                <div className="skill-subsection_items">
                  <p>Hubspot | Google Analytics</p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">CMS</p>
                <div className="skill-subsection_items">
                  <p>Wordpress | Contentful | Strapi</p>
                </div>
              </div>
            </div>
          </article>
          <article className="collateral-skills skill-wrapper">
            <header>
              <Design />
              <h2 className="skill-title">Back-End Development</h2>
            </header>
            <div className="skill-body">
              <p className="skill-overview">
                Developing/integrating API's, configuring databases, deployment and
                all that jazz.
              </p>
              <hr className="skill-hr" />
              <div className="skill-subsection">
                <p className="skill-subsection_title">Frameworks / Libraries</p>
                <div className="skill-subsection_items">
                  <p>
                    Express | Express Validator | Axios | JWT | Bcrypt | Gin | Sequelize
                  </p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">Databases</p>
                <div className="skill-subsection_items">
                  <p>MySQL | Postgres | Firebase | MongoDB</p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">Hosting & Deployment</p>
                <div className="skill-subsection_items">
                  <p>
                    Bluehost | Digital Ocean | Heroku | Netlify | Nginx
                  </p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">API Architectures</p>
                <div className="skill-subsection_items">
                  <p>REST | GraphQL | WebSockets | SSE</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Skills