#!/usr/bin/env node
'use strict';

// minimist turns argv into the options object below. Everything the process is
// told from the outside arrives through here.
const parseArgs = require('minimist');
const { total } = require('./checkout');

const OPTIONS = {
  string: ['currency', 'coupon'],
  boolean: ['json'],
  alias: { c: 'currency', j: 'json' },
  default: { currency: 'JPY', json: false },
};

function itemsFrom(argv) {
  const raw = argv.item ?? [];
  return (Array.isArray(raw) ? raw : [raw]).map((value) => Number.parseInt(value, 10));
}

function main(argvSlice) {
  const argv = parseArgs(argvSlice, OPTIONS);
  const basket = total(itemsFrom(argv), { currency: argv.currency, coupon: argv.coupon });

  if (argv.json) {
    process.stdout.write(`${JSON.stringify(basket)}\n`);
    return basket;
  }
  process.stdout.write(
    `subtotal=${basket.subtotal} discount=${basket.discount} ` +
      `tax=${basket.tax} total=${basket.total} ${basket.currency}\n`,
  );
  return basket;
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (err) {
    process.stderr.write(`${err.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { main, OPTIONS, itemsFrom };
