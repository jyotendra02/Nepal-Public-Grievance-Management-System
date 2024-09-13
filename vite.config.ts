import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  define: {
    global: 'globalThis', // Use 'globalThis' for a safer global definition
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // Allow mixed ES and CommonJS modules
    },
    rollupOptions: {
      plugins: [commonjs()], // Include Rollup's CommonJS plugin to handle non-ES modules
      external: ['fontkit'], // Treat 'fontkit' as external to prevent build issues
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      stream: "stream-browserify",
      os: "os-browserify/browser",
      util: "util",
      process: "process/browser",
      buffer: "buffer",
    },
  },
});


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   define: {
//     global: {},
//   },
//   build: {
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },
//   plugins: [react()],
//   resolve: {
//     alias: {
//       stream: "stream-browserify",
//       os: "os-browserify/browser",
//       util: "util",
//       process: "process/browser",
//       buffer: "buffer",
//     },
//   },
// });
