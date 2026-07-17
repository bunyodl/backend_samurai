import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
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
    files: ['src/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../*', '../**'],
              message:
                'Use @/ path aliases instead of relative parent imports.',
            },
          ],
        },
      ],
    },
  },
  {
    rules: {
      'prefer-const': ['error', { ignoreReadBeforeAssign: false }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-unreachable': 'error',
    },
  },
  eslintConfigPrettier,
]);
