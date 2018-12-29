# Icoset Webpack Plugin

Use Webpack + Icoset to build svg's dynamically into your outputed bundle.

Learn more about icoset: [@icoset/icoset](https://github.com/icoset/icoset/tree/master/packages/icoset)

Check out the icoset presets: [@icoset/preset-*](https://github.com/icoset/icoset)

## What it does

Since [Icoset](https://github.com/icoset/icoset) is a build-time tool, we need a way to get
all these icons into our app during run-time.

Enter `icoset-webpack-plugin` - we can now use webpack to initiate Icoset with a custom
config, and dynamically inject it into our final bundle.

## Install

```bash
// yarn
$ yarn add @icoset/icoset @icoset/icoset-webpack-plugin
```

```bash
// npm
$ npm install -s @icoset/icoset @icoset/icoset-webpack-plugin
```

## Use

```javascript
// webpack.config.js
const IcosetWebpackPlugin = require('@icoset/icoset-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {...},
  plugins: [
    new IcosetWebpackPlugin({
      directory: path.resolve(__dirname, 'icons'),
    })
  ],
}
```

## Options

### `entryName` string (Optional)

Depending on the webpack configuration, you might have more then one entry file.

This option allows you to target a named entry file for injection:

```javascript
module.exports = {
  entry: {
    one: './src/one.js',
    two: './src/two.js',
  },
  plugins: [
    new IcosetWebpackPlugin({
      entryName: 'one', // the plugin will inject the icons into this entry file
      directory: path.resolve(__dirname, 'icons'),
    })
  ],
}
```

### `iconMap` boolean (Optional)

Add the `iconMap` to the `window` when the DOM is ready. Default is `false`.

### Icoset Options

You also can pass in `icoset` options (like `directory` and `icons`).
Check out the [Icoset README](https://github.com/icoset/icoset) to learn more.


## Special Thanks

I just want to give a big shout out to the guys behind the
[`webpack-inject-plugin`](https://github.com/adierkens/webpack-inject-plugin) project. This project
utilizes that plugin to be able to inject custom code into an entry file.
