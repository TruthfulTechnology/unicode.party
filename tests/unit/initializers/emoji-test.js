import Ember from 'ember';
import {initialize} from '../../../initializers/emoji';
import {moduleFor, test} from 'ember-qunit';

let registry, application;

moduleFor('initializer:emoji', 'Unit | Initializer | emoji', {
  needs: ['model:emoji', 'model:keyword'],
  beforeEach() {
    Ember.run(function () {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  },
});

// Replace this with your real tests.
test('it works', function (assert) {
  initialize(registry, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
