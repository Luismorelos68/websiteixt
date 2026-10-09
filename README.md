# websiteixt

Sitio web de IXT · Ixtlamatini. Sitio estático hecho con [Astro](https://astro.build) y Tailwind CSS, publicado en GitHub Pages.

## Desarrollo

Requiere Node 20 o superior.

```sh
npm install
npm run dev       # servidor local en http://localhost:4321/websiteixt/
npm run build     # genera el sitio en dist/
npm run preview   # sirve dist/ para revisarlo antes de publicar
```

## Estructura

```
src/
  pages/        index, contacto, 404 y robots.txt
  layouts/      Base.astro: <head>, metaetiquetas SEO/Open Graph, navbar y footer
  components/   Navbar (con menú móvil) y Footer
  styles/       global.css: Tailwind y @font-face de DejaVu
  fonts/        DejaVu Serif y DejaVu Sans Mono recortadas al rango latino (woff2)
  utils/base.ts ruta base del sitio para armar enlaces
public/
  brand/        logotipos e íconos en SVG
  og.png        imagen para compartir en redes (1200×630)
```

Los enlaces internos se escriben como `${base}/ruta/` usando `src/utils/base.ts`, así funcionan igual en `usuario.github.io/websiteixt` que en un dominio propio.

## Publicación

Cada push a `main` compila y publica el sitio con GitHub Actions (`.github/workflows/deploy.yml`).

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. En `astro.config.mjs`, `site` debe ser `https://<usuario>.github.io` y `base` el nombre del repositorio (`/websiteixt`).

### Dominio propio

1. Crear `public/CNAME` con el dominio (por ejemplo `ixt.mx`).
2. En `astro.config.mjs`: `site: 'https://ixt.mx'` y `base: '/'`.
3. Configurar el DNS del dominio según la [guía de GitHub Pages](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Fuentes

- **Inter** se instala con `@fontsource-variable/inter`.
- **DejaVu Serif** y **DejaVu Sans Mono** viven en `src/fonts/`, recortadas para pesar ~20 KB cada una (licencia en `src/fonts/LICENSE-DejaVu.txt`). Para regenerarlas, con `pip install fonttools brotli`:

  ```sh
  pyftsubset DejaVuSerif-Bold.ttf --flavor=woff2 --layout-features='*' --name-IDs='*' \
    --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD" \
    --output-file=src/fonts/dejavu-serif-700.woff2
  ```
