export function initialize(container, application) {
  application.inject('controller', 'emojiStore', 'service:emoji-store');
}

export default {
  name: 'emoji-store',
  initialize,
};
