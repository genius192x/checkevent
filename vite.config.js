import path from "path"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import { qrcode } from 'vite-plugin-qrcode';

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
    base: '/checkevent/',
    server: {
        port: 8000,
        watch: {
            usePolling: true
        }
    },
    css: {
        postcss: {
        plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
        "@": path.resolve(__dirname, "./src"),
        },
    },
})