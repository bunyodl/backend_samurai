import pluginJs from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import TSEslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.cts', '**/*.mts'],
  },
  { ignores: ['node_modules/', 'dist/', 'tsconfig.json'] },
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parser: TSEslint.parser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': TSEslint,
      js: pluginJs,
    },
  },
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'prefer-const': ['error', { ignoreReadBeforeAssign: false }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'no-unused-vars': 'warn',
      'no-unreachable': 'error',
    },
  },
]);
