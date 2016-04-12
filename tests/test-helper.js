/* jshint unused:false */
/* eslint no-unused-vars:0 */
import resolver from './helpers/resolver';
import './helpers/flash-message';

import flashMessageHelper from './helpers/flash-message';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);
