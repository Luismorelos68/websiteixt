# Capturas de HERMES

Las imágenes de `src/assets/hermes/` son **recreaciones** de la interfaz de HERMES (el sistema que IXT construyó para EquiFin) hechas en HTML con Bootstrap, como la aplicación real, pero con **la marca de IXT en lugar de la de EquiFin** y con **datos ficticios**: nombres, CURP, códigos, gerentes y cifras son inventados. Nunca se deben usar capturas reales del sistema en el sitio.

## Regenerar las imágenes

Después de editar algún archivo de `mockups/hermes/`:

```sh
npm install --no-save bootstrap@5.3.3 bootstrap-icons@1.11.3 playwright@1.56.1
npx playwright install chromium   # solo si no hay un Chromium disponible
node mockups/render.mjs
```

`render.mjs` toma cada página a 1280 px de ancho y escala 2x, y guarda los PNG en `src/assets/hermes/`. Para agregar una pantalla nueva, crea su HTML en `mockups/hermes/` (reutilizando `hermes.css`) y añádela a la lista `capturas` de `render.mjs`.
