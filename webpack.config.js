const { resolve } = require('path');
const IcosetWebpackPlugin = require('./index');

const config = {};
config.mode = 'development';
config.entry = resolve(__dirname, 'dev', 'index.js');
config.output = {
  filename: 'bundle.js',
  path: resolve(__dirname, 'dev'),
};

config.plugins = [

  new IcosetWebpackPlugin({
    directory: resolve(__dirname, 'icons'),
    deepFind: true,
  }),
];

module.exports = config;