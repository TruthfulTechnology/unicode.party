import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

let Router = Ember.Router.extend(googlePageview, {
  location: config.locationType,
});

Router.map(function () {
  this.route('search', {path: '/'});
});

export default Router;
