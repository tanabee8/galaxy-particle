// import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    //   plugins: [glsl()],
    root: 'src',
    base: './',
    server: {
        host: true
    }
})