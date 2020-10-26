module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: [
    'standard'
  ],
  plugins: [
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
