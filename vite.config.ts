import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [svelte()],
    preview: {
        port: 5173,
    },
    server: {
        port: 5173,
    },
})
