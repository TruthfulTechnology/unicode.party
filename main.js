import './styles/app.scss';
import emojidata from 'unicode-emoji-json';
import emojilib from 'emojilib';
import Alpine from 'alpinejs';


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


class EmojiSearcher {

  constructor() {
    this.keywords = new Map();
    this.emojis = new Map();
    this.seedEmoji();
  }

  seedEmoji() {
    for (let char of Object.keys(emojidata)) {
      let {slug, group, skin_tone_support: skinTone} = emojidata[char];
      let keywords = emojilib[char];
      let emoji = {name: humanize(slug, group), char, skinTone};
      if (!char) {
        continue;
      }
      this.addKeyword(name, emoji);
      this.addKeyword(humanize(group), emoji);
      for (let k of keywords) {
        this.addKeyword(k, emoji);
      }
    }
  }

  addKeyword(keyword, emoji) {
    if (this.keywords.has(keyword)) {
      this.keywords.get(keyword).add(emoji);
    } else {
      this.keywords.set(keyword, new Set([emoji]));
    }
  }

  findEmoji(query) {
    let matches = new Set();
    let scores = new Map();
    this.keywords.forEach((emojis, keyword) => {
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
        .map(m => ({...m, score: scores.get(m) || 0}))
        .sort((a, b) => b.score - a.score);  // reversed scoring
  }

}


const searcher = new EmojiSearcher();
const skinTones = {
  none: "\ud83d\udfe8",
  light: "\ud83c\udffb",
  mediumLight: "\ud83c\udffc",
  medium: "\ud83c\udffd",
  mediumDark: "\ud83c\udffe",
  dark: "\ud83c\udfff"
}

Alpine.data('main', () => ({
  _search: '',
  copyCharacters: [],
  timeout: null,
  skinTones: skinTones,
  _currentSkinToneChar: skinTones.none,
  get search() {
    return this._search;
  },
  set search(text) {
    this._search = text;
    if (text === '') {
      window.history.pushState(null, null, new URL(window.location).pathname);
    } else {
      window.history.pushState(null, null, `?query=${text}`);
    }
  },
  get currentSkinToneChar() {
    return this._currentSkinToneChar;
  },
  set currentSkinToneChar(skinTone) {
    this._currentSkinToneChar = skinTone;
    localStorage.skinTone = skinTone;
  },
  get filteredItems() {
    return searcher.findEmoji(this.search);
  },
  setQuery() {
    this.search = new URL(window.location).searchParams.get('query') || '';
  },
  copy(character) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.copyCharacters.length = 0;
    setTimeout(() => {
      this.copyCharacters.push(character);
      navigator.clipboard.writeText(character);
    }, 0);
    this.timeout = setTimeout(() => {
      this.copyCharacters.shift();
    }, 3000);
  },
  withSkinTone({char, skinTone}) {
    if (!skinTone || this.currentSkinToneChar === this.skinTones.none) {
      return char
    }
    return char + this.currentSkinToneChar
  },
  toKebabCase(camelCaseString) {
    return camelCaseString.replace(/[A-Z]/, x => '-' + x.toLowerCase())
  },
  loadSkinToneFromLocalStorage() {
    console.debug('init', localStorage.skinTone)
    if (localStorage.skinTone !== undefined && localStorage.skinTone !== this.skinTones.none) {
      this.currentSkinToneChar = localStorage.skinTone
    } else {
      this.currentSkinToneChar = this.skinTones.none
    }
  }
}));

Alpine.start();
