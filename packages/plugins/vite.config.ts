import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                sorting: resolve(__dirname, 'src/sorting.ts'),
                filtering: resolve(__dirname, 'src/filtering.ts'),
                pagination: resolve(__dirname, 'src/pagination.ts'),
                selection: resolve(__dirname, 'src/selection.ts'),
                resizing: resolve(__dirname, 'src/resizing.ts'),
                reordering: resolve(__dirname, 'src/reordering.ts'),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: ['@table-plugin/core'],
        },
        emptyOutDir: false,
    },
})
