const tape = require('tape');
const { getServices } = require('./getServices');
require('./getJob');

tape('Simple pass test', (t) => {
  t.equal(1, 1, 'one should equal one');
  t.end();
});
