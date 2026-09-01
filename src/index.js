'use strict';

const { total, COUPONS, TAX_RATE } = require('./checkout');
const { main: runCli, OPTIONS } = require('./cli');

module.exports = { total, COUPONS, TAX_RATE, runCli, CLI_OPTIONS: OPTIONS };
