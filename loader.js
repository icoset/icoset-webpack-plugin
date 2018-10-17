const icoset = require('@icoset/icoset');
const { getOptions } = require('loader-utils');

module.exports = function(source) {
  const callback = this.async();
  const options = getOptions(this);
  icoset(options).then(res => {
    callback(null, `module.exports = ${JSON.stringify(res)}`);
  });
}