// Runs after the client and SSR builds. Bakes the rendered page into dist/index.html so crawlers,
// link unfurlers and AI fetchers (most of which never run JavaScript) see the real content, then
// writes llms.txt and sitemap.xml from the same project data the page uses.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const SITE = 'https://jeremygervais.ca'
const dist = (file) => fileURLToPath(new URL(`../dist/${file}`, import.meta.url))
const ssrDir = fileURLToPath(new URL('../dist-ssr', import.meta.url))

const { render, projects } = await import('../dist-ssr/entry-server.js')

const template = await readFile(dist('index.html'), 'utf8')
const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) throw new Error(`prerender: ${placeholder} not found in dist/index.html`)
await writeFile(dist('index.html'), template.replace(placeholder, `<div id="root">${render()}</div>`))

const today = new Date().toISOString().slice(0, 10)

await writeFile(
  dist('sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
)

// https://llmstxt.org — a plain-markdown summary for language models reading the site.
const projectLine = (p) => {
  const links = [
    p.website && `[live](${p.website})`,
    p.code && `[code](${p.code})`,
    p.external && `[${p.external.label}](${p.external.href})`,
    p.video && `[video](https://www.youtube.com/watch?v=${p.video})`,
  ].filter(Boolean)
  const kind = [p.platform, p.types.join(' & ')].filter(Boolean).join(', ')
  const note = p.note ? ` ${p.note}.` : ''
  return `- **${p.title}** (${p.year}; ${kind}): ${p.tech.join(', ')}.${note}${links.length ? ' ' + links.join(' · ') : ''}`
}

await writeFile(
  dist('llms.txt'),
  `# Jeremy Gervais

> Full-stack software developer based in Ontario, Canada, with ${new Date().getFullYear() - 2020}+ years of professional experience and over a decade of freelance work building websites, web apps and SaaS products. Currently a developer at LoginID (passkeys / biometric auth, payments, identity verification). Open to opportunities.

This site (${SITE}/) is a single-page portfolio with About, Skills, Projects and Contact sections.

## Contact

- [Contact form](${SITE}/#contact)
- [GitHub](https://github.com/ordomigato)
- [LinkedIn](https://www.linkedin.com/in/jeremy-gervais/)
- [Behance](https://www.behance.net/fakiescript)
- [Resume (PDF)](${SITE}/files/Jeremy%20Gervais%20-%20Resume.pdf)

## Experience

- 2016: Freelance WordPress sites and small apps for clients.
- 2021–present: Developer (mostly frontend) at [LoginID](https://loginid.ai/), working on passkey-based authentication, payments, identity verification, and agentic-flow solutions built on those products.

## Skills

- Backend & APIs: Go (Gin, Fiber), Node.js / Express; Postgres, Neon, MySQL, MongoDB, Firebase, Drizzle, GORM, Sequelize; REST, GraphQL, WebSockets, SSE, JWT, Zod; AWS (Lambda, Cognito, CloudFront, CloudWatch, SNS, SST); Docker, Digital Ocean, Heroku, Netlify, Nginx.
- Front-end: TypeScript, JavaScript, HTML, CSS; React, Next.js, Gatsby, Vue, Nuxt, Svelte, Lit, Tauri, TanStack Table, Three.js; Redux, Vuex, Pinia; Tailwind, SCSS, Material UI, shadcn/ui; accessibility (WCAG, ARIA) and i18n.
- Tooling & delivery: Jest, Vitest, Playwright, Selenium, Mocha; Git, GitHub Actions, Jira, Confluence, Asana; WordPress, Contentful, Strapi; Figma, Adobe CC.
- AI: agentic engineering, context engineering, agent orchestration.

## Projects

${projects.map(projectLine).join('\n')}
`,
)

await rm(ssrDir, { recursive: true, force: true })
console.log('prerender: wrote index.html, sitemap.xml, llms.txt')
