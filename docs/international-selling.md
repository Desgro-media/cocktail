# Selling internationally: checklist for Cocktail Custom Prints

This is a planning checklist, not legal or tax advice. Confirm every item with a chartered accountant
(GST, FEMA, export rules) and with the payment gateway you choose.

## 1. Payments
- **RBI rule:** an Indian business that collects payments from overseas customers online must use a payment
  aggregator that holds RBI's **PA-CB (Payment Aggregator, Cross Border)** authorisation. A normal domestic
  gateway licence does not cover cross-border payments. Providers reported on the RBI list in early 2026 include
  Razorpay, Cashfree, PayU, BillDesk, PayGlocal, Skydo and BriskPe. Check RBI's own PA-CB list before choosing.
- **PayPal, Stripe, Wise:** do not assume they work for an Indian seller. Check current availability for
  Indian businesses and whether they appear on RBI's list.
- **Questions to ask every gateway before choosing:**
  1. Do you hold final PA-CB authorisation? (not "in principle")
  2. Which currencies can customers pay in, and which currency do I settle in (INR)?
  3. Which methods: international cards, Apple/Google Pay, local methods (UPI for NRIs, wallets)?
  4. Fees: international card rate, currency conversion margin, chargeback fee, settlement time.
  5. What documents do you need from us (GST, IEC, bank AD code, website policies)?
  6. Is there a hosted checkout, so card details never touch our website?
  7. Fraud tools: 3-D Secure, risk scoring, chargeback support.
- **Currency:** show prices in the customer's currency only using rates from the gateway. Never hardcode rates.

## 2. Export compliance (India)
- **IEC** (Import Export Code) from DGFT, **GST** registration, bank **AD code**, and a **LUT** filed on the GST
  portal so exports are zero rated without paying IGST upfront.
- Every product needs an **HS/HSN code** for the customs invoice (garments, caps, etc.).
- Small parcels usually ship as **courier exports**. Check the per consignment value limit with your courier.
- Keep the shipping bill and payment record for every export; the bank needs them to reconcile foreign money received (FIRC/e-BRC).

## 3. Shipping, duties and taxes (destination country)
- Customers can be charged **import duty and VAT/GST** on arrival. Unexpected charges cause refused parcels
  and abandoned carts. Decide between **DDP** (we prepay duties, buyer sees one price) and **DDU** (buyer pays on delivery).
- Rules differ by country (for example UK VAT, EU IOSS for low value parcels, UAE 5% VAT). Start with 2 to 3 countries.
- Use international carriers (DHL, FedEx, aggregators like Shiprocket X). Get real rate cards before showing shipping prices.
- Custom printing is made to order, so **delivery time is longer**. State production time + transit time clearly.

## 4. Returns, sizes and product risks
- Made to order items are normally **non returnable**. Say so before payment (and check consumer law in target countries, e.g. EU/UK distance selling).
- Show **size charts** in cm/inches and international sizing. Kids sizes 20 to 38 are Indian sizes.
- **Customer artwork:** get confirmation that the customer owns or may use the design (copyright/trademark). Keep the right to refuse.
- Religious or cultural designs can be sensitive in some markets. Check each country's rules.

## 5. Data protection and security
- **Laws that may apply:** GDPR (EU), UK GDPR, CCPA/CPRA (California), India DPDP Act 2023. They apply based on
  where the customer lives, not where the shop is.
- **What the website must have:** privacy policy that says what is collected and why, cookie consent for EU/UK
  visitors, a way to ask for data export or deletion, terms of service, returns and shipping policies.
- **Card data (PCI DSS):** use the gateway's hosted checkout or hosted fields so card numbers never reach our
  server. That keeps PCI scope to the lightest level. Never log or store card numbers.
- **Secrets:** gateway secret keys live only on a server (environment variables). The browser only gets public keys.
- **Orders:** calculate prices on the server; confirm payment using the gateway's signed webhook; make order creation idempotent.
- **Logins:** hash passwords on the server (bcrypt/argon2), HTTPS everywhere, secure httpOnly cookies, rate limit
  sign in attempts, email verification, same message for "unknown email" on password reset.
- **General:** HTTPS with HSTS, security headers (CSP), keep dependencies updated, backups, minimal data collected, access logs, 2 factor on admin accounts.
- **Fraud and chargebacks:** international card fraud is higher. Use 3-D Secure, address checks, manual review for large first orders.

## 6. Website changes needed
- [x] Country + international address + phone code at checkout (done)
- [x] Gateway neutral payment layer (`src/services/payments.js`, set `STORE.gateway` in `src/config/store.js`)
- [x] Login / account screens (demo only, `src/services/auth.js` is the swap point)
- [ ] Backend (server) for real accounts, orders, price calculation and payment webhooks
- [ ] Currency display from gateway rates
- [ ] Shipping rate + duty calculation per country
- [ ] Cookie consent banner and full privacy/terms/returns text reviewed by a professional
- [ ] Size chart page, delivery time statements, international FAQ
