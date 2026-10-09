// Convierte las recreaciones de pantallas de HERMES (mockups/hermes/*.html) en PNG a 2x dentro de
// src/assets/hermes/, que es de donde las toma el sitio, y genera las imágenes para compartir el sitio
// (mockups/og/*.html → public/*.jpg). Ver mockups/README.md.
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const salida = path.join(dir, '..', 'src', 'assets', 'hermes');
const publico = path.join(dir, '..', 'public');

// Sin `selector` se captura la ventana completa; con `selector`, solo ese elemento (más `margen` px alrededor).
// Las pantallas de celular llevan `ancho: 390`. Un `#` en `pagina` elige la pestaña que muestra la maqueta (por
// ejemplo, grupo.html#historial).
const capturas = [
  { pagina: 'dashboard.html', archivo: 'dashboard.png', alto: 900 },
  { pagina: 'modulos.html', archivo: 'modulos.png', alto: 1082 },
  { pagina: 'documentos.html', archivo: 'documentos.png', alto: 1162 },
  { pagina: 'grupo.html', archivo: 'grupo.png', alto: 929 },
  { pagina: 'grupo.html#historial', archivo: 'grupo-historial.png', ancho: 1000, alto: 938 },
  { pagina: 'credito.html', archivo: 'credito.png', alto: 980 },
  { pagina: 'prestamo.html', archivo: 'prestamo.png', alto: 800 },
  { pagina: 'cuotas.html', archivo: 'cuotas.png', alto: 1070 },
  { pagina: 'cumpleanos.html', archivo: 'cumpleanos.png', alto: 990 },
  { pagina: 'mi-tablero.html', archivo: 'mi-tablero.png', alto: 945 },
  { pagina: 'mi-tablero.html', archivo: 'mi-tablero-dias.png', alto: 1504, selector: '#cuotas-dia', margen: 20 },
  { pagina: 'riesgo.html', archivo: 'riesgo.png', alto: 790 },
  { pagina: 'riesgo.html', archivo: 'riesgo-tendencia.png', alto: 2606, selector: '#tendencia', margen: 20 },
  { pagina: 'riesgo.html', archivo: 'riesgo-cobro.png', ancho: 900, alto: 3200, selector: '#puntualidad', margen: 20 },
  { pagina: 'riesgo.html', archivo: 'riesgo-atraso.png', alto: 2606, selector: '#donde', margen: 20 },
  { pagina: 'sesiones.html', archivo: 'sesiones.png', ancho: 900, alto: 452 },
  { pagina: 'login.html', archivo: 'login.png', alto: 800 },
  { pagina: 'solicitud-credencial.html', archivo: 'solicitud-credencial.png', ancho: 390, alto: 844 },
  { pagina: 'solicitud-curp.html', archivo: 'solicitud-curp.png', ancho: 390, alto: 844 },
  { pagina: 'solicitud-leida.html', archivo: 'solicitud-leida.png', ancho: 390, alto: 844 },
  { pagina: 'abono.html', archivo: 'abono.png', ancho: 390, alto: 844 },
  { pagina: 'cashflow.html', archivo: 'cashflow.png', alto: 1000 },
  { pagina: 'cashflow.html', archivo: 'cashflow-ciclo.png', alto: 1400, selector: '#ciclo' },
];

// Vistas previas para WhatsApp y redes (Open Graph): 1200×630, JPG ligero (WhatsApp pide menos de 300 KB).
const vistasPrevias = [
  { pagina: 'inicio.html', archivo: 'og.jpg' },
  { pagina: 'caso.html', archivo: 'og-caso.jpg' },
];

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });

for (const { pagina, archivo, ancho = 1280, alto, selector, margen = 0 } of capturas) {
  const [archivoHtml, pestana] = pagina.split('#');
  await page.setViewportSize({ width: ancho, height: alto });
  // Pasar por una página en blanco obliga a recargar aunque solo cambie el `#`.
  await page.goto('about:blank');
  await page.goto(pathToFileURL(path.join(dir, 'hermes', archivoHtml)).href + (pestana ? `#${pestana}` : ''), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const destino = path.join(salida, archivo);
  if (selector && margen) {
    // El elemento debe caber en la ventana (`alto`) para recortarlo con su margen.
    const caja = await page.locator(selector).boundingBox();
    const x = Math.max(0, caja.x - margen);
    const y = Math.max(0, caja.y - margen);
    const clip = { x, y, width: Math.min(ancho, caja.x + caja.width + margen) - x, height: Math.min(alto, caja.y + caja.height + margen) - y };
    await page.screenshot({ path: destino, clip });
  } else if (selector) {
    await page.locator(selector).screenshot({ path: destino });
  } else {
    await page.screenshot({ path: destino });
  }
  console.log('✓', path.relative(process.cwd(), destino));
}

const vista = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const { pagina, archivo } of vistasPrevias) {
  await vista.goto(pathToFileURL(path.join(dir, 'og', pagina)).href, { waitUntil: 'load' });
  await vista.evaluate(() => document.fonts.ready);
  const destino = path.join(publico, archivo);
  await vista.screenshot({ path: destino, type: 'jpeg', quality: 86 });
  console.log('✓', path.relative(process.cwd(), destino));
}

await browser.close();
