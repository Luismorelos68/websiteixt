// BASE_URL sin la barra final: '' en la raíz del dominio (ixt.mx) y '/websiteixt' si el sitio se
// publicara en usuario.github.io/websiteixt. Así `${base}/ruta` funciona en ambos casos (con
// BASE_URL = '/' quedaría '//ruta', que el navegador interpreta como otro dominio).
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
