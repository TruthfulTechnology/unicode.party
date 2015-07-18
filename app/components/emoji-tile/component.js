import Ember from 'ember';

export default Ember.Component.extend({
  charClass: 'hidden-emoji-char',

  copyText(text) {
    let copied;
    let input = $('<input>');
    this.$().append(input);
    try {
      input.val(text);
      input.select();
      copied = document.execCommand('copy');
      console.error('Copy failed');
    } catch (err) {
      console.error('Copying error', err);
      copied = false;
    } finally {
      input.remove();
    }
    return copied;
  },

  click() {
    const flashMessages = Ember.get(this, 'flashMessages');
    const char = this.get('emoji.char');
    let copied = this.copyText(char);
    flashMessages.clearMessages();
    if (copied) {
      flashMessages.success(`Copied <span class="emoji-text">${char}</span>`);
    } else {
      flashMessages.danger(`Couldn't copy <span class="emoji-text">${char}</span>`);
    }
  },

});
