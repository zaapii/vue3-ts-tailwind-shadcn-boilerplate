import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import vue from 'eslint-plugin-vue'

const vueParser = require('vue-eslint-parser')
const sharedGlobals = {
  // Browser globals
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  HTMLElement: 'readonly',
  HTMLInputElement: 'readonly',
  HTMLLinkElement: 'readonly',
  Element: 'readonly',
  Node: 'readonly',
  Event: 'readonly',
  KeyboardEvent: 'readonly',
  MouseEvent: 'readonly',
  FocusEvent: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  console: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  localStorage: 'readonly',
  sessionStorage: 'readonly',
  // Vue macros
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  withDefaults: 'readonly',
}

export default [
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': ['warn', {
        'groups': ['builtin', 'external', 'internal'],
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always'
      }],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: sharedGlobals,
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: typescriptParser,
      },
      globals: sharedGlobals,
    },
    plugins: {
      vue,
      '@typescript-eslint': typescript,
    },
    rules: {
      ...vue.configs['vue3-recommended'],
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'error',
      'vue/require-default-prop': 'error',
      'vue/require-prop-types': 'error',
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': ['error', { order: ['defineProps', 'defineEmits'] }],
      'vue/html-comment-content-spacing': ['error', 'always'],
      'vue/no-unused-properties': ['error', { groups: ['props', 'data', 'computed', 'methods'] }],
      'vue/no-useless-mustaches': 'error',
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/prefer-separate-static-class': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: sharedGlobals,
    },
    rules: {
      'no-unused-vars': 'error',
    },
  },

  {
    files: ['**/__tests__/**/*', '**/*.{test,spec}.*'],
    languageOptions: {
      globals: {
        ...sharedGlobals,
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-empty': 'off',
    },
  },

  {
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },

  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      'playwright-report',
      'test-results',
      '*.config.js',
      '*.config.ts',
      'vite.config.ts',
      'vitest.setup.ts',
      'public',
      'src/lib/eslint/**/*',
      'src/components/ui/**/*',
    ],
  },
]
