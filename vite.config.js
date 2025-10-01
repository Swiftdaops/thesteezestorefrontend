import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwind()],
  server: { port: 5173, host: true },
  resolve: { alias: { '@': '/src' } }
  // If deploying under a subpath or CDN, set base accordingly.
  // For Netlify main site root, leaving default '/' is fine.
  // base: '/',
})
