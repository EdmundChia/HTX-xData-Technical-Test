import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/cv-transcriptions': 'http://localhost:9200', // Proxy for your Elasticsearch endpoint
    },
    // proxy: {
    //   '/cv-transcriptions': 'http://host.docker.internal:9200', // Proxy for your Elasticsearch endpoint
    // },
    host: '0.0.0.0',
    port: 3000,
  },
})
