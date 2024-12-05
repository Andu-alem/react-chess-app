import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#ffffff",
        background_color: "#ffffff",
        scope: "/",
        start_url: "/",
        short_name: "Chess App",
        name: "ChessZone",
        description: "A chase game app. Play with ai opponent or with your friend",
        icons: [
          {
            src: "chessLogo.svg",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/png"
          },
          {
            src: "chessLogo.svg",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "chessLogo.svg",
            type: "image/png",
            sizes: "512x512",
          }
        ]
      }
    })
  ],
})

