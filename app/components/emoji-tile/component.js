import Ember from 'ember';

function copyText(text) {
  let copied;
  let input = document.createElement('input');
  document.body.appendChild(input);
  try {
    input.value = text;
    input.focus();
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
    let copied = copyText(this.get('emoji.char'));
    console.log(`Text was ${copied ? 'copied' : 'not copied'}`);
  },
});
