import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src/"),
      "#components": `${path.resolve(__dirname, "./src/components")}`,
      "#assets": `${path.resolve(__dirname, "./public")}`,
      "#routes": path.resolve(__dirname, "./src/pages"),
      "#services": `${path.resolve(__dirname, "./src/services")}`,
      "#hooks": `${path.resolve(__dirname, "./src/hooks")}`,
      "#utils": `${path.resolve(__dirname, "./src/utils")}`,
      "#schemas": `${path.resolve(__dirname, "./../shared/schemas")}`,
      "#context": `${path.resolve(__dirname, "./src/context")}`,
    },
  },
});
