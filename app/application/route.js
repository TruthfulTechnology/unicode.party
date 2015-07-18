import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    resetQuery() {
      // No need to reset query string if not on search page
    },
  },
});
