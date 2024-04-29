import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {  
        target: process.env.VITE_API_URL || 'http://localhost:4000',  // Access the environment variable
        changeOrigin: true, 
        
      }
    }
  }
})
