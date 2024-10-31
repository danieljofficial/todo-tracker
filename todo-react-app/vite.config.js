import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {'/api': 'https://todo-tracker-backend-4k8q.onrender.com'}
  },
  plugins: [react()],
})
