import type { APIRoute } from 'astro';
import { base } from '../utils/base';

// Los buscadores solo leen robots.txt en la raíz del dominio: con base '/websiteixt' no lo
// verán, pero queda listo para cuando el sitio use un dominio propio.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${base}/sitemap-index.xml`, site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`);
};
