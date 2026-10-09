# Capturas de EquiFin

Las imágenes de `src/assets/equifin/` son **recreaciones** de la interfaz de HERMES (el sistema de EquiFin) hechas en HTML con Bootstrap, como la aplicación real, pero con **datos ficticios**: nombres, CURP, códigos, gerentes y cifras son inventados. Nunca se deben usar capturas reales del sistema en el sitio.

## Regenerar las imágenes

Después de editar algún archivo de `mockups/equifin/`:

```sh
npm install --no-save bootstrap@5.3.3 bootstrap-icons@1.11.3 playwright@1.56.1
npx playwright install chromium   # solo si no hay un Chromium disponible
node mockups/render.mjs
```

`render.mjs` toma cada página a 1280 px de ancho y escala 2x, y guarda los PNG en `src/assets/equifin/`. Para agregar una pantalla nueva, crea su HTML en `mockups/equifin/` (reutilizando `equifin.css`) y añádela a la lista `capturas` de `render.mjs`.
