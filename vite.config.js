import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/portfolio/',
  build: {
    outDir: 'dist'
  },
  preview: {
    port: process.env.PORT || 3000,
    host: true,
    allowedHosts: [
      'portfolio-5-s5wp.onrender.com',
      '.onrender.com',
      'localhost'
    ]
  }
})