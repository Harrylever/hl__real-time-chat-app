import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { comlink } from 'vite-plugin-comlink'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [comlink(), react()],
  worker: {
    format: 'es',
    plugins: [comlink()],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './@/'),
      src: path.resolve(__dirname, './src/'),
    },
  },
})
