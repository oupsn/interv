import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  preview: {
    proxy: {
      "/api/v1": {
        target: "http://something:3000",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
