module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['./'],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['next', 'next/core-web-vitals', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'template-curly-spacing': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@next/next/no-img-element': 'off',
    // 'multiline-ternary': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'jsx-a11y/alt-text': 'warn',
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'max-len': 'warn',
    'no-console': 'warn',
  },
  globals: {
    React: 'readonly',
    google: 'readonly',
    process: 'readonly',
    Razorpay: 'readonly',
  },
};
