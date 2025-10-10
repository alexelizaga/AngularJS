import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html')
    }
  },
  // plugins: [
  //   viteStaticCopy({
  //     targets: [{ src: 'src/pages/**/*.html', dest: 'src/pages' }]
  //   })
  // ],
  server: { port: 3000, open: true }
});