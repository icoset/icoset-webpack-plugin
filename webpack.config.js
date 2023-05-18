const path = require('path');
const IcosetWebpackPlugin = require('./index');

const config = {};
config.mode = 'development';
config.entry = {
  'looky': path.resolve(__dirname, 'dev', 'mainly.js'),
};
config.output = {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dev'),
};

config.plugins = [
  new IcosetWebpackPlugin({
    icosetOptions: {
      directory: path.resolve(__dirname, 'icons'),
      deepFind: true,
      namePrependDirectory: true,
    },
  }),
];

config.devServer = {
  static: {
    directory: path.join(__dirname, 'dev')
  }
}

module.exports = config;
