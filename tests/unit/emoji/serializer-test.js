import {moduleForModel, test} from 'ember-qunit';

moduleForModel('emoji', 'Unit | Serializer | emoji', {
  // Specify the other units that are required for this test.
  needs: ['serializer:emoji', 'transform:set'],
});

// Replace this with your real tests.
test('it serializes records', function (assert) {
  let record = this.subject({
    name: 'happy_face',
    char: 'o',
    category: 'emotions',
    keywords: new Set(['emotion', 'people']),
  });
  let serializedRecord = record.serialize();

  assert.deepEqual(serializedRecord, {
    name: 'happy_face',
    char: 'o',
    category: 'emotions',
    keywords: ['emotion', 'people'],
  });
});
