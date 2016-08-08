import Ember from 'ember';
import emojilib from 'npm:emojilib';
import countries from 'npm:isoc';

function initCountryNameMapping() {
  let m = {};
  for (let country of countries) {
    m[country.alpha2] = country;
  }
  return m;
}

function countryName(code) {
  let c = countryName.c || (countryName.c = initCountryNameMapping());
  if (c[code] !== undefined) {
    return c[code].name.short;
  } else {
    return code;
  }
}

function humanize(word, category) {
  if (word.length === 2 && category === 'flags') {
    return countryName(word.toUpperCase());
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
    for (let name of Object.keys(emojilib.lib)) {
      let {char, category, keywords} = emojilib.lib[name];
      let emoji = {name: humanize(name, category), char};
      if (!char) {
        continue;
      }
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
