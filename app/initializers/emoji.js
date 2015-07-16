import emojis from 'npm:emojilib';

export function initialize(container/* , application */) {
  let store = container.lookup('store:main');
  for (let name of Object.keys(emojis)) {
    let {char, category, keywords} = emojis[name];
    store.push('emoji', store.normalize('emoji', {name, char, category, keywords}));
  }
}
export default {
  name: 'emoji',
  after: ['ember-data'],
  initialize: initialize,
};
