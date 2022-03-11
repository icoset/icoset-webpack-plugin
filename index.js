const InjectPlugin = require('webpack-inject-plugin').default;
const icoset = require('@icoset/icoset');

function customLoader(icosetOptions, injectionType, windowVariableName) {
  return () => icoset(icosetOptions).then(results => {
    if (injectionType === 'window') {
      return `window.${windowVariableName} = '${results}'`
    }

    return `(function() {
  function _insertSvgIcons() {
    const svg = document.createRange().createContextualFragment(\`${results}\`);
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
    const {
      entryName,
      injectionType = 'onDocumentLoad',
      windowVariableName = '__icoset',
      icosetOptions,
    } = this.options;
    let pluginOptions;
    pluginOptions = entryName ? { entryName } : null;
    new InjectPlugin(customLoader(icosetOptions, injectionType, windowVariableName), pluginOptions).apply(compiler);
  }
}
