import Ember from 'ember';

function keywordMatches (keyword='', query='') {
  let normalizedQuery = query.toLowerCase().replace(/\W*/, '');
  return keyword.replace(/_/, '').indexOf(normalizedQuery) !== -1;
}

export default Ember.Controller.extend({
  init() {
    this._super();
    this.updateEmojis();
  },
  updateEmojis(query) {
    this.set('emojiResults', []);
    var keywords = this.store.filter('keyword', keyword => {
      return keywordMatches(keyword.get('id'), query);
    }).then(keywordModels => {
      let keywordStrings = keywordModels.map(k => k.get('id'));
      return this.store.filter('emoji', emoji => {
        let hasKeyword = keywordStrings.some(keyword => {
          return emoji.get('keywords').has(keyword);
        });
        let nameMatches = keywordMatches(emoji.get('name'), query);
        let categoryMatches = keywordMatches(emoji.get('category') || '', query);
        return hasKeyword || nameMatches || categoryMatches;
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
