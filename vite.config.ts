import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import type { ViteUserConfig } from 'vitest/config'

const vitestConfig: ViteUserConfig['test'] = {
  globals: true,
  environment: 'happy-dom',
  setupFiles: ['./vitest.setup.ts'],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html'],
    include: ['src/**/*.{js,ts,vue}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/*.config.*', 'src/components/ui/**', 'src/pages/**', 'src/services/**', 'src/router/**', 'src/components/layout/**'],
  },
  exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/*.config.*'],
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: vitestConfig,
  }
})