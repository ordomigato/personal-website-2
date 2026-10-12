import { projectsUsing } from '../data/projects'
import { useReveal } from '../utils/useReveal'
import styles from './Skills.module.css'

type PickTech = (skill: string) => void

// Skills that show up in a project become buttons, with a count of how many projects use them.
function Chips({ items, onPick }: { items: string[]; onPick: PickTech }) {
  return (
    <div className={styles.chips}>
      {items.map((item) => {
        const count = projectsUsing(item).length
        if (!count) {
          return <span key={item} className={`chip ${styles.skillChip}`}>{item}</span>
        }
        return (
          <button
            key={item}
            type="button"
            className={`chip ${styles.skillChip} ${styles.linked}`}
            title={`See ${count === 1 ? 'the project' : `the ${count} projects`} using ${item}`}
            onClick={() => onPick(item)}
          >
            {item}
            <span className={styles.count}>{count}</span>
          </button>
        )
      })}
    </div>
  )
}

function Skills({ onPickTech }: { onPickTech: PickTech }) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section id="skills" ref={ref} className={`${styles.skills} reveal ${visible ? 'in' : ''}`}>
      <div className="wrap">
        <div className={styles.head}>
          <h2>The stack</h2>
          <p className="eyebrow" style={{ color: 'var(--hot-dim)' }}>02 — Skills</p>
        </div>
        <p className={styles.intro}>
          For the recruiters 😉. I'm in no way limited to these technologies, but I've worked with
          everything here enough to at least have an opinion of them.
        </p>
        <p className={styles.hint}>Numbered skills link to the projects that use them.</p>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h3>Backend &amp; APIs</h3>
            <p className={styles.overview}>Services, data, and everything that keeps them running.</p>
            <div className={styles.sub}>
              <p className={styles.st}>Languages &amp; frameworks</p>
              <Chips items={['Go', 'Gin', 'Fiber', 'Node / Express']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>Databases</p>
              <Chips items={['Postgres', 'Neon', 'MySQL', 'MongoDB', 'Firebase', 'Drizzle', 'GORM', 'Sequelize']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>API &amp; contracts</p>
              <Chips items={['REST', 'GraphQL', 'GraphQL Codegen', 'WebSockets', 'SSE', 'JWT', 'Zod']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>AWS</p>
              <Chips items={['Lambda', 'Cognito', 'CloudFront', 'CloudWatch', 'SNS', 'SST']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>Hosting &amp; deploy</p>
              <Chips items={['Docker', 'Digital Ocean', 'Heroku', 'Netlify', 'Nginx']} onPick={onPickTech} />
            </div>
          </div>

          <div className={styles.col}>
            <h3>Application &amp; Front-End</h3>
            <p className={styles.overview}>State, data fetching, UI, accessibility.</p>
            <div className={styles.sub}>
              <p className={styles.st}>Languages</p>
              <Chips items={['TypeScript', 'JavaScript', 'HTML', 'CSS']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>Frameworks &amp; libraries</p>
              <Chips items={['React', 'Next.js', 'Gatsby', 'Vue', 'Nuxt', 'Svelte', 'Lit', 'Tauri', 'TanStack Table', 'Three.js']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>State</p>
              <Chips items={['Redux', 'Vuex', 'Pinia']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>Styling</p>
              <Chips items={['Tailwind', 'SCSS', 'Material UI', 'shadcn/ui']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>Accessibility &amp; internationalization</p>
              <Chips items={['WCAG', 'ARIA', 'WAVE', 'i18n']} onPick={onPickTech} />
            </div>
          </div>

          <div className={styles.col}>
            <h3>Tooling &amp; Delivery</h3>
            <p className={styles.overview}>Everything around the code: testing, process, content, and design.</p>
            <div className={styles.sub}>
              <p className={styles.st}>Testing</p>
              <Chips items={['Jest', 'Vitest', 'Playwright', 'Selenium', 'Mocha']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>Source &amp; process</p>
              <Chips items={['Git', 'GitHub Actions', 'Jira', 'Confluence', 'Asana']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>CMS</p>
              <Chips items={['WordPress', 'Contentful', 'Strapi']} onPick={onPickTech} />
            </div>
            <div className={styles.sub}>
              <p className={styles.st}>Design</p>
              <Chips items={['Figma', 'Adobe CC']} onPick={onPickTech} />
            </div>
          </div>

          <div className={`${styles.col} ${styles.aiCol}`}>
            <div className={styles.aiHead}>
              <h3>AI &amp; Agentic Workflows</h3>
              <span className={styles.aiTag}>// new terrain</span>
            </div>
            <p className={styles.overview}>
              The newest part of the stack, and the one I'm still actively figuring out, but
              already shipping with it.
            </p>
            <div className={styles.sub}>
              <Chips items={['Agentic Engineering', 'Context Engineering', 'Agent Orchestration']} onPick={onPickTech} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
