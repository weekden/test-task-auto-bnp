import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import importSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      '.husky/**',
      'eslint.config.js',
      'vite.config.ts',
    ],

    languageOptions: {
      parserOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
      },
    },

    plugins: {
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
      'simple-import-sort': importSort,
    },

    rules: {
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/member-ordering': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
);
