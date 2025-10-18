import { defineConfig, normalizePath } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'public',
  base: '/',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve(__dirname, 'public/assets')),
          dest: '.'
        }
      ]
    })
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html')
    }
  },
  server: { port: 3000, open: true }
});

