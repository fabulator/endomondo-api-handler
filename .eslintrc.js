module.exports = {
    extends: [
        '@socifi',
    ],
    settings: {
        polyfills: [
            'fetch',
            'promises',
        ],
    },
    rules: {
        'array-func/prefer-array-from': 0,
    },
};
