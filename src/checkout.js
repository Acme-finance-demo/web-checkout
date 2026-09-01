'use strict';

const TAX_RATE = 0.1;

const COUPONS = {
  SPRING: 0.05,
  WELCOME: 0.1,
};

/**
 * Totals a basket. Amounts are minor units (yen), so no floating point in the
 * subtotal; only the tax and discount steps round.
 */
function total(items, options = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('a basket needs at least one item');
  }
  for (const amount of items) {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error(`item amounts must be positive integers: ${amount}`);
    }
  }

  const subtotal = items.reduce((sum, amount) => sum + amount, 0);
  const discountRate = COUPONS[options.coupon] ?? 0;
  const discount = Math.floor(subtotal * discountRate);
  const taxed = subtotal - discount;
  const tax = Math.floor(taxed * TAX_RATE);

  return {
    currency: options.currency ?? 'JPY',
    subtotal,
    discount,
    tax,
    total: taxed + tax,
  };
}

module.exports = { total, COUPONS, TAX_RATE };
