
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pedidos Maison & Objet',
        short_name: 'MaisonPedidos',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo1.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
