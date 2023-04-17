import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const srcPath = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: '/xline-home/',
  resolve: {
    alias: {
      '@/': `${srcPath}/`,
    },
  },
  plugins: [react()],
})
