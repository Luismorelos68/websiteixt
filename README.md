# websiteixt

Sitio web de IXT · Ixtlamatini. Sitio estático hecho con [Astro](https://astro.build) y Tailwind CSS, publicado en GitHub Pages en https://ixt.mx.

## Desarrollo

Requiere Node 20 o superior.

```sh
npm install
npm run dev       # servidor local en http://localhost:4321/
npm run build     # genera el sitio en dist/
npm run preview   # sirve dist/ para revisarlo antes de publicar
```

## Estructura

```
src/
  pages/        index, casos/microfinanciera, contacto, 404 y robots.txt
  layouts/      Base.astro: <head>, metaetiquetas SEO/Open Graph, navbar y footer
  components/   Navbar (con menú móvil), Footer, CtaContacto, LogoIxt, BrowserFrame, PhoneFrame, Capitulo (capítulos del caso) e Icon
  data/         correos de contacto (contacto.ts) y resultados del caso de éxito (caso.ts)
  assets/       capturas de HERMES con marca IXT y datos ficticios (se generan en mockups/)
  styles/       global.css: Tailwind, @font-face de DejaVu y botones
  fonts/        DejaVu Serif y DejaVu Sans Mono recortadas al rango latino (woff2)
  utils/base.ts ruta base del sitio para armar enlaces
public/
  brand/        logotipos e íconos en SVG
  og*.jpg       vistas previas para WhatsApp y redes (1200×630), generadas desde mockups/og/
mockups/        recreaciones en HTML de las pantallas de HERMES (ver mockups/README.md)
```

Los correos públicos (`l.morelos@ixt.mx` y `ventas@ixt.mx`) viven en `src/data/contacto.ts`: si cambian, se actualizan ahí.

Los enlaces internos se escriben como `${base}/ruta/` usando `src/utils/base.ts`, así funcionan igual en la raíz del dominio que en `usuario.github.io/websiteixt`.

## Publicación

Cada push a `main` compila y publica el sitio en https://ixt.mx con GitHub Actions (`.github/workflows/deploy.yml`).

Configuración en GitHub (una sola vez):

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Settings → Pages → Custom domain: `ixt.mx`** y, cuando el DNS esté listo, **Enforce HTTPS**. Al publicar con GitHub Actions no hace falta un archivo `CNAME`: el dominio se guarda en esta configuración.

### DNS (Squarespace)

El dominio se administra en Squarespace Domains. Registros para GitHub Pages:

| Tipo  | Host | Valor                   |
|-------|------|-------------------------|
| A     | @    | 185.199.108.153         |
| A     | @    | 185.199.109.153         |
| A     | @    | 185.199.110.153         |
| A     | @    | 185.199.111.153         |
| CNAME | www  | luismorelos68.github.io |

Los registros de Google Workspace (MX y TXT del correo) no se tocan. Más detalle en la [guía de GitHub Pages](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site).

Para publicar sin dominio propio en `https://<usuario>.github.io/websiteixt/`, en `astro.config.mjs` usar `site: 'https://<usuario>.github.io'` y `base: '/websiteixt'`.

## Fuentes

- **Inter** se instala con `@fontsource-variable/inter`.
- **DejaVu Serif** y **DejaVu Sans Mono** viven en `src/fonts/`, recortadas para pesar ~20 KB cada una (licencia en `src/fonts/LICENSE-DejaVu.txt`). Para regenerarlas, con `pip install fonttools brotli`:

  ```sh
  pyftsubset DejaVuSerif-Bold.ttf --flavor=woff2 --layout-features='*' --name-IDs='*' \
    --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD" \
    --output-file=src/fonts/dejavu-serif-700.woff2
  ```
