require('./postcss/index.css');
var _ = require('lodash')
require('./containers/CloudMusic.jsx');

window.LOG = true;

console.__proto__.constructor.prototype.logg = function() {
  if (window.LOG)
    console.log.apply(console, arguments);
}
