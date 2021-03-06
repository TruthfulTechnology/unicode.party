import Ember from 'ember';
import emojilib from 'npm:emojilib';
import emojidata from 'npm:unicode-emoji-json';

function humanize(word, category) {
  if (category === 'Flags' && word.match(/^flag_/)) {
    return word.replace(/^flag_/, '').replace(/_/g, ' ');
  }
  return (word || '').replace(/_/g, ' ');
}

function scoreKeyword(keyword='', query='') {
  let normalizedQuery = query.toLowerCase().replace(/\W*/, '');
  if (keyword.indexOf(normalizedQuery) === -1) {
    return 0;
  }
  return normalizedQuery.length / keyword.length;
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
    for (let char of Object.keys(emojidata)) {
      let {slug, group} = emojidata[char];
      let keywords = emojilib[char];
      let emoji = {name: humanize(slug, group), char};
      if (!char) {
        continue;
      }
      this.addKeyword(name, emoji);
      this.addKeyword(humanize(group), emoji);
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
    let scores = new Map();
    this.get('keywords').forEach((emojis, keyword) => {
      let score = scoreKeyword(keyword, query);
      if (score === 0) {
        return;
      }
      for (let emoji of emojis) {
        scores.set(emoji, (scores.get(emoji) || 0) + score);
      }
      matches = new Set([...matches, ...emojis]);
    });

    return Array.from(matches)
        .map(m => ({name: m.name, char: m.char, score: scores.get(m) || 0}))
        .sort((a, b) => b.score - a.score);  // reversed scoring
  },

});
