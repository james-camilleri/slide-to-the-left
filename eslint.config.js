import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import ts from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'files',
    files: ['**/*.svelte', '**/*.ts'],
  },
  {
    name: 'ignores',
    ignores: ['.svelte-kit/', 'build/', 'dist/', 'src/assets/code'],
  },

  {
    name: 'language options & settings',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: svelteParser,
      parserOptions: {
        project: true,
        parser: ts.parser,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.svelte'],
      },
    },

    // Enable typescript module resolution.
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],

  {
    name: 'disable type-checked',
    files: ['**/*.js'],
    ...ts.configs.disableTypeChecked,
  },

  {
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },

          // Sort "import..." statements in a predefined grouped order.
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'sibling',
            'index',
            'object',
          ],

          // Sort imported members,
          // i.e. the bits in between {} in "import { a, b, c } from 'my-module".
          named: {
            enabled: true,
            types: 'types-first',
          },

          'newlines-between': 'always',
        },
      ],

      'import/no-unresolved': [
        'error',
        {
          ignore: ['\\$app/', '\\$env/'],
        },
      ],

      'import/no-duplicates': null,

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]
