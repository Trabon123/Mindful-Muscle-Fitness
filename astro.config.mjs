// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// TODO: replace with the production domain once it's confirmed (see TODO.md).
const SITE_URL = 'https://mindful-muscle.vercel.app';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'always' },
  prefetch: false,
});
