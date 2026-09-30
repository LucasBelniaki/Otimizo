// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://otimizo.com.br',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/obrigado') && !page.includes('/404') && !page.includes('/politica-de-privacidade') }),
  ],
  vite: { plugins: [tailwindcss()] },
});
