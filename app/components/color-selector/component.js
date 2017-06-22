import Ember from 'ember';
import emojilib from 'npm:emojilib';

const toneNames = ['Light', 'Medium-Light', 'Medium', 'Medium-Dark', 'Dark'];

export default Ember.Component.extend({
  tones: toneNames.map((tone, i) => {
    return {
      name: tone,
      char: emojilib.fitzpatrick_scale_modifiers[i],
    };
  }),
  actions: {
    setColor(char) {
      this.sendAction('clickAction', char);
    },
  },
});
