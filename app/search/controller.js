import Ember from 'ember';
import KeyboardMixin from 'ember-keyboard-service/mixins/keyboard';

const workInInput = {actOnInputElement: true};

export default Ember.Controller.extend(KeyboardMixin, {

  queryParams: ['query', 'modifier'],
  query: undefined,
  modifier: "",
  initialQuery: Ember.computed.oneWay('query'),

  updateEmojis(query='') {
    this.set('query', query || undefined);
    let matches = this.emojiStore.findEmoji(query);
    this.set('emojiResults', matches.slice(0, 32));
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
    {key: 'Enter', handler: 'toggleSearchFocus', options: workInInput},
    {key: '/', handler: 'toggleSearchFocus', options: workInInput},
  ],

  resetQuery() {
    this.set('initialQuery', undefined);
  },

  actions: {
    search(query) {
      Ember.run.debounce(this, this.updateEmojis, query, 250);
    },
    setColor(char) {
      this.set('modifier', char);
    },
  },

});
