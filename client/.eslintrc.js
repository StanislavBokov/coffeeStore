module.exports = {
  extends: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'object-curly-spacing': ["error", "always"],
    "indent": ["error", 2],
    'no-console': 1,
    'comma-dangle': 2,
  
    'react/react-in-jsx-scope': 0,
    'arrow-body-style': 0,
    'implicit-arrow-linebreak': 2,
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 0 }]
    
  },
  overrides: [
    {
      files: ['src/store/**'],
      rules: {
        'import/prefer-default-export': 0,
      },
    },
  ],
  ignorePatterns: '*.js',
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  plugins: ['react', 'import', 'react-hooks', 'jest', '@typescript-eslint'],
};
