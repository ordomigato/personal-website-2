import { projects } from '../data/projects'
import { useReveal } from '../utils/useReveal'
import styles from './About.module.css'

type Entry = { role: string; detail: string; href?: string; current?: boolean }

const timeline: { year: string; entries: Entry[] }[] = [
  {
    year: '2016',
    entries: [
      { role: 'Freelance WordPress builds', detail: 'Began building client sites, and basic apps on the side.' },
    ],
  },
  {
    year: '2020',
    entries: [
      { role: 'ThisPlayShelf', detail: 'Built to catalog my game collection.' },
      { role: 'SecurePark', detail: 'Client app initially built for Skyview Security to handle parking permits for residents.' },
    ],
  },
  {
    year: '2021',
    entries: [
      {
        role: 'Joined LoginID',
        href: 'https://loginid.ai/',
        current: true,
        detail: 'Began position as developer (mostly frontend) working on software designed around biometric auth (passkeys), payments, identity verification, and more. Followed the companies transition into creating solutions based on our products for agentic flows as well.',
      },
    ],
  },
  {
    year: '2024',
    entries: [
      {
        role: 'Floor ORG',
        detail: 'Built a web app based on the hit show "The Floor" for a community of online reality gamers.',
      },
    ],
  },
  {
    year: '2026',
    entries: [
      {
        role: 'Card Maker Studio',
        detail: 'Currently developing a specialized desktop app for designing and printing board game assets (cards, tokens, boards, etc.).',
      },
    ],
  },
]

// Timeline entries named after a project link down to its card.
const projectTitles = new Set(projects.map((p) => p.title))

function About({ onPickProject }: { onPickProject: (title: string) => void }) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section id="about" ref={ref} className={`${styles.about} reveal ${visible ? 'in' : ''}`}>
      <div className="wrap">
        <p className="eyebrow" style={{ color: 'var(--hot-dim)' }}>01 — About</p>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.statement}>
              Turning <em>product briefs</em> into shipped software: the service underneath, the
              interface on top, and the pipeline that deploys both.
            </h2>
            <div className={styles.paras}>
              <p className={styles.para}>
                I'm a software developer first, and a tinkerer second. Driven by a need to keep
                learning and improving, I stumbled into the world of development almost by
                accident while pursuing a degree in psychology, and landed my first fulltime tech job at a
                company specializing in authentication, identity, and payments a few years later.
              </p>
              <p className={styles.para}>
                Since then, I spend my days obsessing over the user experience, experimenting
                with design, and bridging what product needs with what the rest of the
                engineering team can build.
              </p>
              <p className={styles.para}>
                On my own time, I'm continually taking on client projects as they come in as well as personal ones to hone my skills. It's nice to at least
                have something to show that isn't behind an NDA 😅. Most of the projects below
                are exactly that.
              </p>
            </div>
          </div>
          <ol className={styles.timeline}>
            {timeline.map((group) => (
              <li key={group.year} className={styles.group}>
                <span className={styles.year}>{group.year}</span>
                <ul className={styles.entries}>
                  {group.entries.map((entry) => {
                    const project = projectTitles.has(entry.role) ? entry.role : null
                    return (
                    <li key={entry.role} className={styles.entry}>
                      <p className={styles.role}>
                        {entry.href ? (
                          <a href={entry.href} target="_blank" rel="noopener noreferrer">
                            {entry.role} ↗
                          </a>
                        ) : project ? (
                          <button
                            type="button"
                            className={styles.projectLink}
                            title={`See ${project} in Projects`}
                            onClick={() => onPickProject(project)}
                          >
                            {entry.role} ↓
                          </button>
                        ) : (
                          entry.role
                        )}
                        {entry.current && <span className={styles.current}>Present Employer</span>}
                      </p>
                      <p className={styles.detail}>{entry.detail}</p>
                    </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default About
