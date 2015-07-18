import {moduleFor, test} from 'ember-qunit';

moduleFor('controller:search', {
  needs: ['service:keyboard'],
});

// Replace this with your real tests.
test('it exists', function (assert) {
  let controller = this.subject();
  assert.ok(controller);
});
