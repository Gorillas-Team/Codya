module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:jsdoc/recommended'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'jsdoc/valid-types': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/check-tag-names': 0,
    'jsdoc/require-returns-description': 0,
    'jsdoc/require-property-description': 0
  }
}
