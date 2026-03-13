/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- ESTO ES LO MÁS IMPORTANTE
  images: {
    unoptimized: true, // GitHub Pages no soporta la optimización de imágenes nativa de Next.js
  },
  // Si tu sitio NO está en el dominio principal (ej: usuario.github.io/proyecto/), 
  // añade la siguiente línea con el nombre de tu repositorio:
  // basePath: '/SKU_prioritization', 
};

module.exports = nextConfig;
