// vite.config.js
import path from "path";
import vue from "file:///F:/Frontend/2024/CheckEvent/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///F:/Frontend/2024/CheckEvent/node_modules/vite/dist/node/index.js";
import tailwind from "file:///F:/Frontend/2024/CheckEvent/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///F:/Frontend/2024/CheckEvent/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "F:\\Frontend\\2024\\CheckEvent";
var vite_config_default = defineConfig({
  base: "/checkevent/",
  server: {
    port: 8e3,
    watch: {
      usePolling: true
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxGcm9udGVuZFxcXFwyMDI0XFxcXENoZWNrRXZlbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXEZyb250ZW5kXFxcXDIwMjRcXFxcQ2hlY2tFdmVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovRnJvbnRlbmQvMjAyNC9DaGVja0V2ZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXHJcblxyXG5cclxuaW1wb3J0IHRhaWx3aW5kIGZyb20gXCJ0YWlsd2luZGNzc1wiXHJcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogJy9jaGVja2V2ZW50LycsXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICBwb3J0OiA4MDAwLFxyXG4gICAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgICAgIHVzZVBvbGxpbmc6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgcG9zdGNzczoge1xyXG4gICAgICAgIHBsdWdpbnM6IFt0YWlsd2luZCgpLCBhdXRvcHJlZml4ZXIoKV0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbdnVlKCldLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUSxPQUFPLFVBQVU7QUFDNVIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBRzdCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQU56QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDSCxZQUFZO0FBQUEsSUFDaEI7QUFBQSxFQUNKO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxTQUFTO0FBQUEsTUFDVCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3BDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ1AsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3BDO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
