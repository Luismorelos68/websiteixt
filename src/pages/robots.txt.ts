import type { APIRoute } from 'astro';
import { base } from '../utils/base';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${base}/sitemap-index.xml`, site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`);
};
