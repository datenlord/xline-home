// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/no-children-prop': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        trailingComma: 'all',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
