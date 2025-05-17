import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // This ensures toastify CSS gets included in production
    assetsInclude: ['**/*.css'],
    // Optional but recommended for performance
    cssCodeSplit: true
  }
});
