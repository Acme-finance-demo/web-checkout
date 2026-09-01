'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { total } = require('../src/checkout');
const { itemsFrom } = require('../src/cli');
const parseArgs = require('minimist');

test('totals a basket with tax', () => {
  const basket = total([1000, 2000]);
  assert.equal(basket.subtotal, 3000);
  assert.equal(basket.tax, 300);
  assert.equal(basket.total, 3300);
});

test('applies a known coupon before tax', () => {
  const basket = total([1000], { coupon: 'WELCOME' });
  assert.equal(basket.discount, 100);
  assert.equal(basket.total, 990);
});

test('ignores an unknown coupon', () => {
  assert.equal(total([1000], { coupon: 'NOPE' }).discount, 0);
});

test('refuses an empty basket', () => {
  assert.throws(() => total([]), /at least one item/);
});

test('refuses a non-integer amount', () => {
  assert.throws(() => total([12.5]), /positive integers/);
});

test('minimist collects repeated --item into an array', () => {
  const argv = parseArgs(['--item', '1200', '--item', '3400'], { string: ['currency'] });
  assert.deepEqual(itemsFrom(argv), [1200, 3400]);
});
