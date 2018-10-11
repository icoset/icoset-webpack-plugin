const fs = require('fs');
const icoset = require('@icoset/icoset');

/*
what do we want a loader/plugin to do?

plugin:

1: put svg in body once DOM is ready (canopy use case).
the problem is that we don't get the viewBoxMap with it

2: put svg in body once DOM is loaded and save the viewBoxMap in memory (on window).
what a weird abstraction...

3: write svg directly into html file (right after the <body> tag).
same problem as 1.

loader:

1:
 */


module.exports = class IcosetWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  inject(results, injectPath) {
    return new Promise(resolve => {
      const injectScript = `\ndocument.addEventListener('DOMContentLoaded', function() { document.body.prepend('${results.svg}') });`;
      fs.appendFile(injectPath, injectScript, err => {
        if (err) console.warn(err);
        resolve();
      });
    });
  }

  apply(compiler) {
    compiler.hooks.done.tap('IcosetWebpackPlugin', (callback) => {
      icoset(this.options)
        .then(results => this.inject(results, `${compiler.options.output.path}/${compiler.options.output.filename}`))
        .then(callback)
        .catch((err) => {
          console.log(err)
        });
    });
  }
}