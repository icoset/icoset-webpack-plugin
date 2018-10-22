const InjectPlugin = require('webpack-inject-plugin').default;
const icoset = require('@icoset/icoset');

function customLoader(options) {
  return () => icoset(options).then(results => {
    return `\n\ndocument.addEventListener('DOMContentLoaded', function() {
  const svg = document.createRange().createContextualFragment(\`${results.svg}\`);
  if (document.body.childNodes[0]) {
    document.body.insertBefore(svg, document.body.childNodes[0]);  
  } else {
    document.body.appendChild(svg);
  }
});`;
  });
}

module.exports = class MyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { entryName, ...icosetOptions } = this.options;
    let pluginOptions;
    pluginOptions = entryName ? { entryName } : null;
    new InjectPlugin(customLoader(icosetOptions), pluginOptions).apply(compiler);
  }
}