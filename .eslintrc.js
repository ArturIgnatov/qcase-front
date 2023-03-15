module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.js', 'webpack.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [ "@services", "./src/services" ]
        ]
      },
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'react-hooks',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-child-element-spacing': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/prop-types': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-did-mount-set-state': 0,
    'react/no-did-update-set-state': 0,
    'react/no-multi-comp': 0,
    'react/no-string-refs': 1,
    'react/no-unknown-property': 0,
    'react/no-unstable-nested-components': 1,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 1,
    'react/display-name': 0,
    'react/jsx-boolean-value': 2,
    'react/jsx-sort-props': 0,
    "react/jsx-curly-brace-presence": 2,
    "react/jsx-closing-bracket-location": 2,
    "react/jsx-equals-spacing": 2,

    'no-mixed-spaces-and-tabs': 1,
    'no-trailing-spaces': 1,
    'quotes': [1, 'single', 'avoid-escape'],
    'semi:': 0,
    "indent": 'off',
    "object-curly-spacing": [2, "always"],
    // "@typescript-eslint/indent": ["error", 4],

    'comma-spacing': 0,
    'no-multi-spaces': 0,
    'brace-style': 0,
    'import/named': 0,
    'import/no-unresolved': 0,



    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
  },
};
