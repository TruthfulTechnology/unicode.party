import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    query: {
      replace: true,
      modifier: true,
    },
  },
  actions: {
    resetQuery() {
      this.get('controller').resetQuery();
    },
  },
});
