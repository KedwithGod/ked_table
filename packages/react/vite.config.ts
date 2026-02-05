import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'TableReact',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'ked-table-core', 'zustand'],
        },
        emptyOutDir: false,
    },
})
