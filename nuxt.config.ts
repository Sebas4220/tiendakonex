// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt'
  ],

  // ⚠️ Agrega esta sección completa para los estilos de Bootstrap 5
  app: {
    head: {
      title: 'Mayorista Online',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
      ],
      link: [
        // CSS de Bootstrap 5
        { 
          rel: 'stylesheet', 
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' 
        }
      ],
      script: [
        // JS de Bootstrap 5 (Necesario para el carrusel de banners y los efectos)
        { 
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          tagPosition: 'bodyClose'
        }
      ]
    }
  }
})