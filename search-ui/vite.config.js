import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/cv-transcriptions': 'http://localhost:9200', // Proxy for your Elasticsearch endpoint
    },
    port: 3000 // Change here if needed
  },
})
