import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  char: DS.attr('string'),
  category: DS.attr('string'),
  keywords: DS.attr('set'),

  formattedName: function () {
    return this.get('name').replace(/_/g, ' ');
  }.property('name'),

});
