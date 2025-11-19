/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: ' /shop-vegetables',
  test: {
    globals: true,
    environment: "jsdom",
  },
})
