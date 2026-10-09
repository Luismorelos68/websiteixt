// Convierte las recreaciones de pantallas de HERMES (mockups/hermes/*.html) en PNG a 2x dentro de
// src/assets/hermes/, que es de donde las toma el sitio, y genera las imágenes para compartir el sitio
// (mockups/og/*.html → public/*.jpg). Ver mockups/README.md.
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const salida = path.join(dir, '..', 'src', 'assets', 'hermes');
const publico = path.join(dir, '..', 'public');

// Sin `selector` se captura la ventana completa; con `selector`, solo ese elemento. Las pantallas de celular
// llevan `ancho: 390`.
const capturas = [
  { pagina: 'dashboard.html', archivo: 'dashboard.png', alto: 900 },
  { pagina: 'dashboard.html', archivo: 'dashboard-gerentes.png', alto: 1400, selector: '#tabla-gerentes' },
  { pagina: 'clientes.html', archivo: 'clientes.png', alto: 900 },
  { pagina: 'grupos.html', archivo: 'grupos.png', alto: 860 },
  { pagina: 'credito.html', archivo: 'credito.png', alto: 980 },
  { pagina: 'credito.html', archivo: 'politica.png', alto: 940, selector: '#politica' },
  { pagina: 'login.html', archivo: 'login.png', alto: 800 },
  { pagina: 'solicitud-credencial.html', archivo: 'solicitud-credencial.png', ancho: 390, alto: 844 },
  { pagina: 'solicitud-curp.html', archivo: 'solicitud-curp.png', ancho: 390, alto: 844 },
  { pagina: 'solicitud-leida.html', archivo: 'solicitud-leida.png', ancho: 390, alto: 844 },
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

for (const { pagina, archivo, ancho = 1280, alto, selector } of capturas) {
  await page.setViewportSize({ width: ancho, height: alto });
  await page.goto(pathToFileURL(path.join(dir, 'hermes', pagina)).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const destino = path.join(salida, archivo);
  if (selector) {
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
