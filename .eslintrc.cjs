module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends:
      ['@nuxtjs/eslint-config-typescript',
        'plugin:vue/vue3-essential',
        'plugin:vue/base',
        'plugin:prettier/recommended',
        'prettier',
      ],
    plugins: ['prettier'],
    rules: {
        'vue/multi-word-component-names': 0,
        'no-console': 'off'
    },
}