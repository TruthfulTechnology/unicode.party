import Ember from 'ember';
import KeyboardMixin from 'ember-keyboard-service/mixins/keyboard';

function keywordMatches(keyword='', query='') {
  let normalizedQuery = query.toLowerCase().replace(/\W*/, '');
  return keyword.replace(/_/g, '').indexOf(normalizedQuery) !== -1;
}

export default Ember.Controller.extend(KeyboardMixin, {

  queryParams: ['query'],
  query: undefined,
  initialQuery: Ember.computed.oneWay('query'),

  updateEmojis(query='') {
    this.set('query', query || undefined);
    this.store.filter('keyword', keyword => {
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
      this.set('emojiResults', matches.slice(0, 32));
    });
  },

  toggleSearchFocus() {
    const searchBox = Ember.$('input');
    if (searchBox.is(':focus')) {
      searchBox.blur();
    } else {
      // Don't put "/" in input box
      Ember.run.later(() => {
        searchBox.focus().select();
      });
    }
  },

  keyboardHandlers: [
    {key: 'Enter', handler: 'toggleSearchFocus', options: {actOnInputElement: true}},
    {key: '/', handler: 'toggleSearchFocus', options: {actOnInputElement: true}},
  ],

  resetQuery() {
    this.set('initialQuery', undefined);
  },

  actions: {
    search(query) {
      Ember.run.debounce(this, this.updateEmojis, query, 250);
    },
  },

});
