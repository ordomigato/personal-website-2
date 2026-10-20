import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Same baseline as the hero's "N+ years", so the meta description and link previews keep counting
// up on their own instead of going stale. Filled in at build time, so it updates on the next deploy.
const proYears = () => String(new Date().getFullYear() - 2020)

const htmlYears = (): Plugin => ({
  name: 'html-pro-years',
  transformIndexHtml: (html) => html.replaceAll('%PRO_YEARS%', proYears()),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), htmlYears()],
})
