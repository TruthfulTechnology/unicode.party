import Ember from 'ember';
import emojilib from 'npm:emojilib';

function humanize(category) {
  return (category || '').replace(/_/g, ' ');
}

function keywordMatches(keyword='', query='') {
  let normalizedQuery = query.toLowerCase().replace(/\W*/, '');
  return keyword.indexOf(normalizedQuery) !== -1;
}

export default Ember.Service.extend({

  keywords: null,
  emojis: null,

  init() {
    this.set('keywords', new Map());
    this.set('emojis', new Set());
    this.seedEmoji();
  },

  seedEmoji() {
    for (let name of Object.keys(emojilib)) {
      let {char, category, keywords} = emojilib[name];
      let emoji = {name: humanize(name), char};
      if (!char) { continue; }
      this.addKeyword(name, emoji);
      this.addKeyword(humanize(category), emoji);
      for (let k of keywords) {
        this.addKeyword(k, emoji);
      }
    }
  },

  addKeyword(keyword, emoji) {
    let keywords = this.get('keywords');
    if (keywords.has(keyword)) {
      keywords.get(keyword).add(emoji);
    } else {
      keywords.set(keyword, new Set([emoji]));
    }
  },

  findEmoji(query) {
    let matches = new Set();
    this.get('keywords').forEach((emojis, keyword) => {
      if (keywordMatches(keyword, query)) {
        matches = new Set([...matches, ...emojis]);
      }
    });
    return Array.from(matches);
  },

});
