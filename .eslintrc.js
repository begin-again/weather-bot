module.exports = {
    extends: ['eslint-recommended']
    , parserOptions: {
        ecmaVersion: 6
        , sourceType: 'script'
    },
    rules: {
        "brace-style": ["error", "stroustrup", {"allowSingleLine": true}],
    }
}