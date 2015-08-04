/* globals Modernizr */
import Ember from 'ember';

export default Ember.Component.extend({
  charClass: 'hidden-emoji-char',

  copyText(text) {
    let copied;
    let input = Ember.$('<input style="opacity: 0;">');
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

  selectText(element) {
    if (document.body.createTextRange) {
      let range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      let selection = window.getSelection();
      let range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  },

  flashCopyMessage(copied, char) {
    const flashMessages = Ember.get(this, 'flashMessages');
    const charHTML = `<span class="emoji-text">${char}</span>`;
    flashMessages.clearMessages();
    if (copied) {
      flashMessages.success(`Copied ${charHTML}`);
    } else {
      flashMessages.danger(`Couldn't copy ${charHTML}`);
    }
  },

  click() {
    if (!Modernizr.clipboard) {
      this.selectText(this.$().find('.emoji-char')[0]);
      return;
    }
    const char = this.get('emoji.char');
    let copied = this.copyText(char);
    this.flashCopyMessage(copied, char);
  },

});
