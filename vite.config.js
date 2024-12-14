import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

export default defineConfig({
  plugins: [vue()],
  base: "/",
  build: {
    rollupOptions: {
      ignore: "src/scripts/*",
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash][extname]",
      },
      preserveModules: true,
    },
    target: "es2022",
  },
});
