import Ember from 'ember';

export default Ember.Controller.extend({
  // TODO Make keyword model and search for matching keyword and then get linked emoji
  updateEmojis(query) {
    var matches = this.store.filter('emoji', (emoji) => {
      return emoji.get('keywords').has(query);
    }).then((matches) => {
      this.set('emojiResults', matches);
    });
  },
  actions: {
    search(query) {
      Ember.run.debounce(this, this.updateEmojis, query, 100);
    },
  },
});
