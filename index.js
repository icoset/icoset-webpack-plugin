const InjectPlugin = require('webpack-inject-plugin').default;
const icoset = require('@icoset/icoset');

function customLoader(options, addIconMap) {
  return () => icoset(options).then(results => {
    return `\n
(function() {
  ${addIconMap ? `window.__icosetIconMap = ${JSON.stringify(results.iconMap)};` : ''}
  function _insertSvgIcons() {
    const svg = document.createRange().createContextualFragment(\`${results.svg}\`);
    if (document.body.childNodes[0]) {
      document.body.insertBefore(svg, document.body.childNodes[0]);  
    } else {
      document.body.appendChild(svg);
    }
  }
  if (/comp|inter|loaded/.test(document.readyState)) {
    _insertSvgIcons();
  } else {
    document.addEventListener('DOMContentLoaded', _insertSvgIcons);
  }
})();`;
  });
}

module.exports = class MyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { entryName, iconMap, ...icosetOptions } = this.options;
    let pluginOptions;
    pluginOptions = entryName ? { entryName } : null;
    new InjectPlugin(customLoader(icosetOptions, iconMap), pluginOptions).apply(compiler);
  }
}