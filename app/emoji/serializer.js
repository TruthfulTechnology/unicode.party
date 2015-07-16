import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalize(type, hash, property) {
    hash.id = hash.name;
    return this._super(type, hash, property);
  },
});
