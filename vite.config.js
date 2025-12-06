import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/portfolio/',  // ← COM barra no início e fim
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})