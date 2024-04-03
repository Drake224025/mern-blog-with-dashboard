import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Add a proxy because frontend and backend run on two different ports
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
