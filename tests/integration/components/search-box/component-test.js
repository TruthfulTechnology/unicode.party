import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('search-box', 'Integration | Component | search box', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.render(hbs`{{search-box}}`);

  assert.equal(this.$().text().trim(), '');
  assert.equal(this.$().find('input').val(), '');

  // Template block usage:
  this.render(hbs`
    {{#search-box}}
      template block text
    {{/search-box}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it accepts initial query', function(assert) {
  assert.expect(1);

  this.render(hbs`{{search-box query="animal"}}`);

  assert.equal(this.$().find('input').val(), 'animal');
});

test('it sends search action', function(assert) {
  assert.expect(4);
  const newQuery = 'animal';
  let calls = 0;

  this.set('query', undefined);
  this.on('search', val => {
    const query = (calls < 2) ? undefined : newQuery;
    assert.equal(val, query, `${val} is ${query}`);
    calls++;
  });

  this.render(hbs`{{search-box query=query searchAction="search"}}`);

  assert.equal(this.$().find('input').val(), '');

  this.$().find('input').val('animal').trigger('input');

});
