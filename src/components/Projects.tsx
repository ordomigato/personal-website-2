import { useEffect, useMemo, useState } from 'react'
import { projectId, projects, projectsUsing, type Project, type ProjectType } from '../data/projects'
import { useReveal } from '../utils/useReveal'
import MediaDialog, { type Media } from './MediaDialog'
import styles from './Projects.module.css'

type Filter = 'all' | ProjectType

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Development', value: 'Development' },
  { label: 'Design', value: 'Design' },
]

// Development reads in pale and design in sky, so the tag colour says which kind of work it was.
// Projects that were built *and* designed lead with the platform and tint only the "Design" part.
function TypeTag({ project }: { project: Project }) {
  const designed = project.types.includes('Design')

  if (!project.platform) {
    return <span className={`${styles.type} ${styles.typeDesign}`}>Design</span>
  }

  return (
    <span className={styles.type}>
      {project.platform}
      {designed && <> · <span className={styles.designPart}>Design</span></>}
    </span>
  )
}

type Props = {
  /** Skill picked in the Stack section; narrows the grid to projects that used it. */
  tech: string | null
  onClearTech: () => void
  /** Project picked in the About timeline; scrolled to and briefly highlighted. */
  focus: { title: string; nonce: number } | null
}

function Projects({ tech, onClearTech, focus }: Props) {
  const { ref, visible } = useReveal<HTMLElement>()
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<{ title: string; media: Media } | null>(null)
  const [highlight, setHighlight] = useState<string | null>(null)
  // Cards whose extra tech has been expanded with the "+N more" chip.
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggleTech = (title: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })

  useEffect(() => {
    if (!focus) return
    // The card may be hidden by the current filter, so show everything before scrolling.
    setFilter('all')
    setHighlight(focus.title)
    const frame = requestAnimationFrame(() => {
      document.getElementById(projectId(focus.title))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    const timer = setTimeout(() => setHighlight(null), 2200)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [focus])

  const shown = useMemo(
    () =>
      (tech ? projectsUsing(tech) : projects).filter((p) => filter === 'all' || p.types.includes(filter)),
    [filter, tech]
  )

  return (
    <section id="projects" ref={ref} className={`${styles.projects} reveal ${visible ? 'in' : ''}`}>
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--lilac)' }}>03 — Projects</p>
            <h2 className={styles.heading}>Selected work</h2>
          </div>
          <p className={styles.count} suppressHydrationWarning>{shown.length} shown · 2020 – {new Date().getFullYear()}</p>
        </div>

        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''} ${f.value === 'Design' ? styles.design : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
          {tech && (
            <button
              type="button"
              className={`${styles.filterBtn} ${styles.techFilter}`}
              onClick={onClearTech}
              aria-label={`Clear ${tech} filter`}
            >
              Using {tech} ✕
            </button>
          )}
        </div>

        <div className={styles.grid}>
          {shown.map((project, i) => (
            <article
              key={project.title}
              id={projectId(project.title)}
              className={`${styles.card} ${highlight === project.title ? styles.highlight : ''}`}
            >
              <div className={styles.cardTop}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')} / {project.year}</span>
                <TypeTag project={project} />
              </div>
              <div className={styles.cover}>
                <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
              </div>
              <p className={styles.title}>{project.title}</p>
              <div className={styles.tech}>
                {project.tech.map((t) => (
                  <span key={t} className={`chip ${styles.techChip}`}>{t}</span>
                ))}
                {(project.moreTech || project.pastTech) && (() => {
                  const more = project.moreTech ?? []
                  const past = project.pastTech ?? []
                  // Open by hand, or automatically while a Stack skill filter is on, since the
                  // matching skill may be one of the hidden ones.
                  const open = expanded.has(project.title) || tech !== null
                  return (
                    <>
                      {open && more.map((t) => (
                        <span key={t} className={`chip ${styles.techChip}`}>{t}</span>
                      ))}
                      {open && past.map((t) => (
                        <span
                          key={t}
                          className={`chip ${styles.pastChip}`}
                          title={`${t}: used by an earlier version, since replaced`}
                          aria-label={`${t} (replaced)`}
                        >
                          {t}
                        </span>
                      ))}
                      {tech === null && (
                        <button
                          type="button"
                          className={`chip ${styles.moreChip}`}
                          aria-expanded={open}
                          onClick={() => toggleTech(project.title)}
                        >
                          {open ? 'Show less' : `+${more.length + past.length} more`}
                        </button>
                      )}
                    </>
                  )
                })()}
              </div>

              <div className={styles.links}>
                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer">Visit site ↗</a>
                )}
                {project.code && (
                  <a href={project.code} target="_blank" rel="noopener noreferrer">Source ↗</a>
                )}
                {project.external && (
                  <a href={project.external.href} target="_blank" rel="noopener noreferrer">{project.external.label} ↗</a>
                )}
                {project.video && (
                  <button
                    type="button"
                    className={styles.mediaBtn}
                    onClick={() => setOpen({ title: project.title, media: { kind: 'video', id: project.video! } })}
                  >
                    Watch demo ▶
                  </button>
                )}
                {project.gallery && (
                  <button
                    type="button"
                    className={styles.mediaBtn}
                    onClick={() => setOpen({ title: project.title, media: { kind: 'image', ...project.gallery! } })}
                  >
                    View full size image ⤢
                  </button>
                )}
                {project.note && <span className={styles.disabled}>{project.note}</span>}
              </div>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <MediaDialog
          media={open.media}
          title={open.title}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  )
}

export default Projects
