import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// Tell Vite that ".riv" files are static assets (like images)
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.riv"],
});