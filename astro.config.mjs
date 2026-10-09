import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://luismorelos68.github.io',
  base: '/websiteixt',
  integrations: [tailwind(), sitemap()],
});
