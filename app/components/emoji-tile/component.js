import Ember from 'ember';

function copyText(text) {
  let copied;
  let input = document.createElement('input');
  document.body.appendChild(input);
  try {
    input.value = text;
    input.select();
    copied = document.execCommand('copy');
  } catch (err) {
    copied = false;
  } finally {
    input.remove();
  }
  return copied;
}

export default Ember.Component.extend({
  charClass: 'hidden-emoji-char',
  click() {
    const flashMessages = Ember.get(this, 'flashMessages');
    const char = this.get('emoji.char');
    let copied = copyText(char);
    if (copied) {
      flashMessages.success(`Copied ${char}`);
    } else {
      flashMessages.danger(`Could not copy ${char}`);
    }
  },
});
