module.exports = {
    extends: [
        '@socifi',

    ],
    plugins: [
        'typescript', // fix for Webstorm, otherwise it does not parse ts files
    ],
    rules: {
        camelcase: 0,
        'no-dupe-class-members': 0, // general for typescript
    },
};
