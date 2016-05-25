/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      'moment/moment.js',
      'lodash/lodash.js',
      'ts-md5/dist/md5.js',
      'ng2-uploader/src/**/*.js',
      'ng2-uploader/ng2-uploader.js',
      'json5/lib/json5.js',
      'ng2-bootstrap/components/pagination/*.js',
      'ng2-bootstrap/**/*.js',
    ]
  });
};
