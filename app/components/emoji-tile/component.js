import Ember from 'ember';

export default Ember.Component.extend({
  charClass: 'hidden-emoji-char',

  copyText(text) {
    let copied;
    let input = Ember.$('<input>');
    this.$().append(input);
    try {
      input.val(text);
      input.select();
      copied = document.execCommand('copy');
    } catch (err) {
      copied = false;
    } finally {
      input.remove();
    }
    return copied;
  },

  click() {
    const flashMessages = Ember.get(this, 'flashMessages');
    const char = this.get('emoji.char');
    const charHTML = `<span class="emoji-text">${char}</span>`;
    let copied = this.copyText(char);
    flashMessages.clearMessages();
    if (copied) {
      flashMessages.success(`Copied ${charHTML}`);
    } else {
      flashMessages.danger(`Couldn't copy ${charHTML}`);
    }
  },

});
