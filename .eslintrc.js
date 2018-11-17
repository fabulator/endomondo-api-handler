module.exports = {
    extends: [
        '@socifi',
    ],
    plugins: [
        'typescript', // fix for Webstorm, otherwise it does not parse ts files
    ],
    rules: {
        'unicorn/catch-error-name': [2, { name: 'exception' }],
        'camelcase': 0,
        'no-shadow': 0,
        'no-redeclare': 0,
        'no-dupe-args': 0,
        'array-func/prefer-array-from': 0,
    },
};
