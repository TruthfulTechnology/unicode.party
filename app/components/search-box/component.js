import Ember from 'ember';

export default Ember.Component.extend({
  queryObserver: function () {
    // TODO replace with "input" action observer
    this.send('search');
  }.observes('query'),
  actions: {
    search() {
      this.sendAction('searchAction', this.get('query'));
    },
  },
});
