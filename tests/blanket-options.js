/* eslint-disable no-var */
/* globals blanket, module */

var options = {
  modulePrefix: 'unicodeparty',
  filter: '//.*unicodeparty/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['json'],
    autostart: true,
  },
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
