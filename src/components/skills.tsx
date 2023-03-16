import * as React from "react"
import Uiux from "../images/svg/uiux.svg"
import WebDev from "../images/svg/webdev.svg"
import Design from "../images/svg/design.svg"
import "../styles/skills.scss"

const Skills: React.FC = () => {
  return (
    <div>
      <section id="skills" className="skills-section">
        <div
          className="skills-container container mx-auto"
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
                    React | Vue | Gatsby | Nuxt | Lit Element | Redux | Vuex | jQuery | Rellax
                    | Swiper | ThreeJS
                  </p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">
                  CSS Framework & Technologies
                </p>
                <div className="skill-subsection_items">
                  <p>
                    Bootstrap | Tailwind | Material UI | Font Awesome | SASS
                  </p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">UI / UX Tools</p>
                <ul className="skill-subsection_items">
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
                From client-friendly WYSIWYG to fully custom solution.
              </p>
              <hr className="skill-hr" />
              <div className="skill-subsection">
                <p className="skill-subsection_title">Languages</p>
                <div className="skill-subsection_items">
                  <p>HTML | CSS | JavaScript | Typescript | Golang | JSON | Markdown</p>
                </div>
              </div>
              <div className="skill-subsection">
                <p className="skill-subsection_title">Development Tools</p>
                <div className="skill-subsection_items">
                  <p>Git | Github | Gitlab | Docker | WSL | Trello | Asana | NPM</p>
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
                Developing/Integrating API's, building databases, deploying and
                all that jazz.
              </p>
              <hr className="skill-hr" />
              <div className="skill-subsection">
                <p className="skill-subsection_title">Frameworks / Libraries</p>
                <div className="skill-subsection_items">
                  <p>
                    Express | Express Validator | Axios | JWT
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
                <p className="skill-subsection_title">Architectures</p>
                <div className="skill-subsection_items">
                  <p>REST | GraphQL</p>
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