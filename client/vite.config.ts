import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')

  return {
    plugins: [react()],
    server: {
      host: true,
      port: Number(env.VITE_PORT || 3005),
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    resolve: { alias: { '@': path.resolve('./src'), src: path.resolve('./src') } },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-router-dom', 'react-dom'],
            antd: ['antd', '@ant-design/icons', '@ant-design/cssinjs'],
          },
        },
      },
    },
  }
})
