import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      dev: true,
    }
  })],
  mode: "dev",
  build: {
    minify: false,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "assets/[name].[ext]",
        name: "assets/[name].[ext]",
        manualChunks: {},
      },
    },
  }
})
