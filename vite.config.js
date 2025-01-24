import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

export default defineConfig(({mode}) => {
    console.log(`Running in mode: ${mode}`);

    return {
        base: mode === 'production' ? '/tedooo-home-assignment/' : '/',
        plugins: [react(), svgr()],
        server: {
            host: '0.0.0.0',
            proxy: {
                '/hw': {
                    target: 'https://backend.tedooo.com',
                    changeOrigin: true,
                },
            },
        },
    };
});
