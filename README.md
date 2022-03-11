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

### `icosetOptions` object (Required)

Pass in icoset options here (like `directory` and `icons`).
Check out the [Icoset README](https://github.com/icoset/icoset/tree/master/packages/icoset) to learn more.

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
      icosetOptions: {
        directory: path.resolve(__dirname, 'icons'),
      },
    })
  ],
}
```

### `injectionType` "onDocumentLoad" | "window" (optional)

Choose how you want your icons added to your app.

- `onDocumentLoad` **DEFAULT** - inject svgs directly into the `<body>` on document load.
- `window` - inject svgs into a window variable for later use (window variable name defaults to `window.__icoset`).

### `windowVariableName` string (optional)

If `injectionType === 'window'`, you can change that variable name here.

```javascript
module.exports = {
  plugins: [
    new IcosetWebpackPlugin({
      injectionType: 'window',
      windowVariableName: '__whatever_you_want__',
    })
  ],
}
// output: window.__whatever_you_want__ = "<svg>...</svg>";
```

## Special Thanks

I just want to give a big shout out to our friends behind the
[`webpack-inject-plugin`](https://github.com/adierkens/webpack-inject-plugin) project. This project
utilizes that plugin to be able to inject custom code into an entry file.
