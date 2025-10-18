import { defineConfig } from 'vite';
import { resolve } from 'path';

// export default defineConfig({
//   root: 'public',
//   base: '/',
//   build: {
//     outDir: '../dist',
//     emptyOutDir: true,
//     rollupOptions: {
//       input: resolve(__dirname, 'public/index.html')
//     }
//   },
//   server: { port: 3000, open: true }
// });

export default defineConfig({
  root: 'public',                 // sigues trabajando con /public como raíz
  base: '/AngularJS/',            // << IMPORTANTE para GitHub Pages
  build: {
    outDir: '../docs',            // Pages servirá /docs
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html')
    }
  },
  server: { port: 3000, open: true }
});


