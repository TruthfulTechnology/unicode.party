import emojis from 'npm:emojilib';

export function initialize(container/* , application */) {
  let store = container.lookup('store:main');
  for (let name of Object.keys(emojis)) {
    let {char, category, keywords} = emojis[name];
    if (keywords) {
      let keywordJSON = keywords.map(k => ({
        id: k,
        'type': 'keyword',
      }))
      store.push({data: keywordJSON});
    }
    if (!keywords) {
    }
    store.push(store.normalize('emoji', {id: name, name, char, category, keywords}));
  }
}
export default {
  name: 'emoji',
  after: ['ember-data'],
  initialize: initialize,
};
