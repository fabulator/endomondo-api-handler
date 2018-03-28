import getConfig from 'socifi-rollup-config';
import path from 'path';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-re';
import packageJson from './package.json';
const { getBaseBabelConfig } = require('socifi-rollup-config/src/helpers');

const configs = getConfig(packageJson, path.resolve(__dirname, 'src'));

export default configs.map((config) => {
    return Object.assign({}, config, {
        plugins: config.plugins.map((item) => {
            if (item.name === 'babel') {
                return babel(getBaseBabelConfig(false, {
                    node: '9.6.1',
                }));
            }

            if (item.name === 're') {
                return replace({
                    patterns: [
                        {
                            test: 'rest-api-handler/src',
                            replace: 'rest-api-handler/dist',
                        },
                    ],
                });
            }

            return item;
        }),
    });
});
