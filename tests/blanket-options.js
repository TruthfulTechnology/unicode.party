/* eslint-disable no-var, object-shorthand */
/* globals blanket, module */

var options = {
  modulePrefix: 'unicodeparty',
  filter: '//.*unicodeparty/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['lcov'],
    lcovOptions: {
      outputFile: 'lcov.info',
      renamer: function (moduleName) {
        var expression = /^codecov/;
        return moduleName.replace(expression, 'app') + '.js';
      },
    },
    autostart: true,
  },
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
