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
        .map(m => ({name: m.name, char: m.char, score: scores.get(m) || 0}))
        .sort((a, b) => b.score - a.score);  // reversed scoring
  }

}


const searcher = new EmojiSearcher();

Alpine.data('main', () => ({
  _search: '',
  copyCharacters: [],
  timeout: null,
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
}));


window.onkeypress = (event) => {
  if (event.charCode === 13) {
    const input = document.getElementById('query');
    if (document.activeElement === input) {
      input.blur();
    } else {
      input.focus();
      input.select();
    }
  }
};

Alpine.start();
