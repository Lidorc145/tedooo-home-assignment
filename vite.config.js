import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // base: '/tedooo-home-assignment',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend.tedooo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
