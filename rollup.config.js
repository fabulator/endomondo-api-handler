import getConfig from 'socifi-rollup-config';
import path from 'path';
const babel = require('rollup-plugin-babel');
import packageJson from './package.json';
const { getBaseBabelConfig } = require('socifi-rollup-config/src/helpers');

const configs = getConfig(packageJson, path.resolve(__dirname, 'src'));

export default configs.map((config) => {
    return Object.assign({}, config, {
        plugins: config.plugins.map((item) => {
            if (item.name !== 'babel') {
                return item;
            }
            return babel(getBaseBabelConfig(false, {
                node: '9.6.1',
            }));
        }),
    });
})
