// BASE_URL sin la barra final: '/websiteixt' en GitHub Pages y '' cuando el sitio vive en la
// raíz de un dominio propio. Así `${base}/ruta` funciona en ambos casos (con BASE_URL = '/'
// quedaría '//ruta', que el navegador interpreta como otro dominio).
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
