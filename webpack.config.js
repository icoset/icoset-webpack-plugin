const { resolve } = require('path');
const IcosetWebpackPlugin = require('./index');

const config = {};
config.mode = 'development';
config.entry = {
  'looky': resolve(__dirname, 'dev', 'mainly.js'),
};
config.output = {
  filename: 'bundle.js',
  path: resolve(__dirname, 'dev'),
};

config.plugins = [
  new IcosetWebpackPlugin({
    directory: resolve(__dirname, 'icons'),
    deepFind: true,
    namePrependDirectory: true,
  }),
];

module.exports = config;