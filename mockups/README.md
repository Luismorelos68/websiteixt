# Capturas de HERMES

Las imágenes de `src/assets/hermes/` son **recreaciones** de la interfaz de HERMES (el sistema que IXT construyó para una microfinanciera) hechas en HTML con Bootstrap, como la aplicación real, pero con **la marca de IXT en lugar de la del cliente** y con **datos ficticios**: nombres, CURP, códigos, gerentes y cifras son inventados. Nunca se deben usar capturas reales del sistema en el sitio, ni el nombre o el logo del cliente: nuestros clientes cuidan su privacidad.

## Regenerar las imágenes

Después de editar algún archivo de `mockups/hermes/`:

```sh
npm install --no-save bootstrap@5.3.3 bootstrap-icons@1.11.3 playwright@1.56.1
npx playwright install chromium   # solo si no hay un Chromium disponible
node mockups/render.mjs
```

`render.mjs` toma cada página a 1280 px de ancho (390 px las de celular) y escala 2x, y guarda los PNG en `src/assets/hermes/`. También genera las vistas previas para compartir el sitio en WhatsApp y redes a partir de `mockups/og/`: `public/og.jpg` (portada) y `public/og-caso.jpg` (caso de éxito), de 1200×630 y menos de 300 KB. Para agregar una pantalla nueva, crea su HTML en `mockups/hermes/` (reutilizando `hermes.css`) y añádela a la lista `capturas` de `render.mjs`.
