import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CSS에 vendor prefixes를 자동으로 추가해주는 PostCSS 플러그인 추가
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
