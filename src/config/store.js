// Store-wide settings. Change these when the client decides on gateway, countries and currencies.

export const STORE = {
  // Currency all prices in products.js are written in.
  baseCurrency: 'INR',

  // Currencies the store will charge in. Add a currency here only after the payment
  // gateway confirms it supports it, and after exchange rates come from the gateway (never hardcode rates).
  currencies: ['INR'],

  // Payment gateway: null until the client chooses one. See src/services/payments.js.
  // Examples later: 'razorpay' | 'cashfree' | 'payu' | 'paypal' | 'stripe'
  gateway: null,

  // Countries we ship to. 'IN' is domestic. Add countries once shipping rates and duties are confirmed.
  shipTo: ['IN'],
};

// Full list shown in the address form so international customers can enter their country.
// Keep or trim as needed; the store only accepts orders for countries in STORE.shipTo.
export const COUNTRIES = [
  { code: 'IN', name: 'India', dial: '+91' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { code: 'QA', name: 'Qatar', dial: '+974' },
  { code: 'KW', name: 'Kuwait', dial: '+965' },
  { code: 'OM', name: 'Oman', dial: '+968' },
  { code: 'BH', name: 'Bahrain', dial: '+973' },
  { code: 'SG', name: 'Singapore', dial: '+65' },
  { code: 'MY', name: 'Malaysia', dial: '+60' },
  { code: 'GB', name: 'United Kingdom', dial: '+44' },
  { code: 'US', name: 'United States', dial: '+1' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'AU', name: 'Australia', dial: '+61' },
  { code: 'DE', name: 'Germany', dial: '+49' },
];

export const isShippable = (code) => STORE.shipTo.includes(code);
