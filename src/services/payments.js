// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT SERVICE (gateway neutral)
//
// The checkout page only talks to this file. When the client chooses a gateway,
// implement ONE adapter below and set STORE.gateway in src/config/store.js.
// Nothing else in the website needs to change.
//
// SECURITY RULES (apply to every gateway):
//  1. Card details must be typed into the gateway's hosted page or hosted fields
//     (iframe), never into our own inputs. That keeps the store out of heavy PCI scope.
//  2. The secret key lives ONLY on a server. This website (frontend) only ever
//     holds the public/publishable key.
//  3. The order total is calculated on the SERVER. Never trust an amount sent from the browser.
//  4. Payment success is confirmed by the gateway's webhook (server to server),
//     not by the browser landing on a "thank you" page.
//  5. Verify the webhook signature and make order creation idempotent (no double orders).
// ─────────────────────────────────────────────────────────────────────────────

import { STORE } from '../config/store';

/**
 * Adapter shape every gateway must implement:
 *   createPayment({ items, currency, customer, shippingAddress }) -> { redirectUrl } | { clientSecret, ... }
 * Typically this calls OUR server (POST /api/payments/create) which calls the gateway with the secret key.
 */
const ADAPTERS = {
  // razorpay: { createPayment: async (order) => { ... } },
  // cashfree: { ... },
  // paypal:   { ... },
  // stripe:   { ... },
};

export const isPaymentConfigured = () => Boolean(STORE.gateway && ADAPTERS[STORE.gateway]);

export async function createPayment(order) {
  if (!isPaymentConfigured()) {
    return { status: 'not_configured' };
  }
  return ADAPTERS[STORE.gateway].createPayment(order);
}
