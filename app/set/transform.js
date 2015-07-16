import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return new Set(serialized);
  },

  serialize(deserialized) {
    let array = [];
    for (let value of deserialized.keys()) {
      array.push(value);
    }
    return array;
  },
});
