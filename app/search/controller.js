import Ember from 'ember';

function keywordMatches (keyword, query) {
  return keyword.indexOf(query.toLowerCase()) !== -1;
}

export default Ember.Controller.extend({
  updateEmojis(query) {
    var keywords = this.store.filter('keyword', keyword => {
      return keywordMatches(keyword.get('id'), query);
    }).then(keywordModels => {
      let keywordStrings = keywordModels.map(k => k.get('id'));
      return this.store.filter('emoji', emoji => {
        return keywordStrings.some(keyword => {
          return emoji.get('keywords').has(keyword);
        });
      });
    }).then(matches => {
      this.set('emojiResults', matches);
    });
  },
  actions: {
    search(query) {
      Ember.run.debounce(this, this.updateEmojis, query, 100);
    },
  },
});
