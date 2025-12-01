import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: "10.10.20.70",
    port: "3002",
  },
  preview: {
    host: '0.0.0.0',
    port: 3002,
    strictPort: true,
    allowedHosts: ['dashboard.podlove.co', 'www.dashboard.podlove.co'],
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd'],
          icons: ['@ant-design/icons'],
          vendor: ['redux', '@reduxjs/toolkit', 'react-router-dom'],
        },
      },
    },
  },
  plugins: [react()],
})

