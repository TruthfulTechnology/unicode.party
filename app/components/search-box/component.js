import Ember from 'ember';

export default Ember.Component.extend({

  queryObserver: function () {
    // TODO replace with "input" action observer
    this.send('search');
  }.observes('value'),

  value: function () {
    return this.get('query') || '';
  }.property('query'),

  didInsertElement() {
    this._super();
    this.send('search');
  },

  actions: {
    search() {
      this.sendAction('searchAction', this.get('value'));
    },
  },

});
