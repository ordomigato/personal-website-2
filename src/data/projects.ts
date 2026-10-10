export type ProjectType = 'Development' | 'Design'
export type Platform = 'Web App' | 'Website' | 'Desktop App'

export interface Project {
  title: string
  year: number
  /** Which filters the project shows under. */
  types: ProjectType[]
  /** What was built, shown on the card. Design-only projects leave it out. */
  platform?: Platform
  tech: string[]
  /** Also used, so it counts for the Stack's skill links, but left off the card to keep it short. */
  moreTech?: string[]
  image: string
  website?: string
  code?: string
  external?: { label: string; href: string }
  /** YouTube id, for projects that were never deployed and can only be shown as a recording. */
  video?: string
  /** Full-size image opened in a popup, for work that only exists as artwork. */
  gallery?: { src: string; caption?: string }
  note?: string
}

export const projects: Project[] = [
  {
    title: 'Card Maker Studio',
    year: 2026,
    types: ['Development', 'Design'],
    platform: 'Desktop App',
    tech: ['Tauri', 'React', 'TypeScript', 'Tailwind', 'shadcn/ui', 'Zod', 'Vitest', 'Playwright'],
    moreTech: ['TanStack Table', 'i18n'],
    image: '/projects/card-maker-studio.png',
    gallery: { src: '/projects/card-maker-studio.png' },
    note: 'In development',
  },
  {
    title: 'GameShelf',
    year: 2020,
    types: ['Development', 'Design'],
    platform: 'Web App',
    tech: ['Nuxt', 'TypeScript', 'Tailwind', 'shadcn/ui', 'Postgres', 'Drizzle', 'SST', 'AWS Lambda', 'Cognito', 'Playwright'],
    moreTech: ['Vue', 'Zod', 'Neon', 'TanStack Table', 'i18n', 'Vitest', 'GitHub Actions'],
    image: '/projects/gameshelf-thumb.png',
    code: 'https://github.com/ordomigato/game-shelf',
    note: 'Being rebuilt and moved to AWS, relaunching soon',
  },
  {
    title: 'SecurePark',
    year: 2020,
    types: ['Development', 'Design'],
    platform: 'Web App',
    tech: ['Go', 'Fiber', 'Vue', 'Postgres', 'REST', 'JWT', 'bcrypt', 'Nginx'],
    image: '/projects/parking-app-thumb.png',
    code: 'https://github.com/ordomigato/parking-app',
    video: 'SCixTRwwc_g',
    note: 'Not deployed, so here it is on video',
  },
  {
    title: 'Skyview Security Website',
    year: 2020,
    types: ['Development', 'Design'],
    platform: 'Website',
    tech: ['WordPress', 'Elementor Pro', 'Digital Ocean'],
    image: '/projects/skyview-thumb.png',
    website: 'https://skyviewsecurity.ca/',
    note: 'Since updated by others, so the live site no longer reflects my original build',
  },
  {
    title: 'Message App',
    year: 2021,
    types: ['Development'],
    platform: 'Web App',
    tech: ['React', 'Material UI', 'Node.js', 'Express', 'REST', 'Sequelize', 'Socket.io'],
    image: '/projects/messenger-thumb.png',
    code: 'https://github.com/ordomigato/message-app',
    note: 'No live demo',
  },
  {
    title: 'Travel Odyssey',
    year: 2023,
    types: ['Design'],
    tech: ['Adobe XD', 'Material UI'],
    image: '/projects/travel-app/landing-page.png',
    external: { label: 'View on Behance', href: 'https://www.behance.net/gallery/169097717/Travel-Odyssey' },
  },
  {
    title: 'Floor ORG',
    year: 2024,
    types: ['Development'],
    platform: 'Web App',
    tech: ['TypeScript', 'Vue', 'Pinia', 'Firebase', 'Netlify'],
    image: '/projects/floor-thumb.jpg',
    website: 'https://floor-game.netlify.app',
    code: 'https://github.com/ordomigato/floor',
    video: 'LoDZnveNiDU',
  },
  {
    title: 'Icon Set (1)',
    year: 2024,
    types: ['Design'],
    tech: ['Adobe Illustrator'],
    image: '/projects/icon-set.png',
    gallery: { src: '/projects/icon-set.png', caption: 'Just some SVG icons I made =)' },
  },
]

/** Skill names that are spelled differently, or bundled, in project tech lists. */
const techAliases: Record<string, string[]> = {
  'Node / Express': ['Node.js', 'Express'],
  'Adobe CC': ['Adobe XD', 'Adobe Illustrator'],
  WebSockets: ['Socket.io'],
}

/** Baseline of every development project, so linked from the Stack but left off the cards. */
const everyBuild = ['HTML', 'CSS', 'Git']

/** DOM id of a project's card, so other sections can scroll to it. */
export function projectId(title: string) {
  return 'project-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function projectsUsing(skill: string) {
  if (everyBuild.includes(skill)) return projects.filter((p) => p.types.includes('Development'))
  // TypeScript is listed where it was used, so plain JavaScript is every other build.
  if (skill === 'JavaScript') {
    return projects.filter((p) => p.types.includes('Development') && !p.tech.includes('TypeScript'))
  }
  const names = techAliases[skill] ?? [skill]
  return projects.filter((p) => [...p.tech, ...(p.moreTech ?? [])].some((t) => names.includes(t)))
}
