import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // ✅ 显式绑定 host
    port: 5173         // ✅ 可选：保持端口一致
  }
})
