import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  console.log(`Running in mode: ${mode}`);

  return {
    base: mode === 'production' ? '/tedooo-home-assignment/' : '/',
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/Impression': {
          target: 'https://backend.tedooo.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/Impression/, ''),
        },
        '/hw': {
          target: 'https://backend.tedooo.com',
          changeOrigin: true,
        },
      },
    },
  };
});
