import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"
import tailwindcss from '@tailwindcss/vite'
export default defineConfig(({mode}) => {
  return {
    base: mode === 'production' ? '/tedooo-home-assignment/' : '/',
    plugins: [react(), tailwindcss(), svgr()],
    server: {
      proxy: {
        '/hw': {
          target: 'https://backend.tedooo.com',
          changeOrigin: true,
        },
      },
    },
  };
});

