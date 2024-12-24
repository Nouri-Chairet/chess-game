import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'stockfish': 'node_modules/stockfish/src/stockfish.js'
    }
  },

  server: {
    hmr: {
      overlay: false
    }
  }
  
})