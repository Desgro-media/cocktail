import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, CreditCard, Globe, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductImage from '../components/ProductImage';
import { BRAND } from '../data/products';
import { STORE, COUNTRIES, isShippable } from '../config/store';
import { createPayment, isPaymentConfigured } from '../services/payments';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function Checkout() {
  const { items, subtotal, showToast } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', country: 'IN', phone: '',
    address: '', city: '', region: '', postal: '', notes: '',
  });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  if (items.length === 0) {
    return (
      <div className="bg-mist min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl mb-2">YOUR BAG IS EMPTY</h1>
        <p className="text-muted text-[14px] mb-6">Add something to your bag before proceeding to checkout.</p>
        <Link to="/shop" className="px-8 py-3 rounded-full bg-ink text-white font-bold text-[13px] uppercase tracking-wider">Shop now</Link>
      </div>
    );
  }

  const country = COUNTRIES.find((c) => c.code === form.country);
  const international = form.country !== 'IN';
  const shippable = isShippable(form.country);

  const message = [
    `Hi Cocktail Custom, I would like to order:`,
    ...items.map((i) => `• ${i.name} | Size ${i.size} | Qty ${i.qty} | ${STORE.baseCurrency} ${i.price * i.qty}`),
    `Total: ${STORE.baseCurrency} ${subtotal}`,
    ``,
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${country?.dial} ${form.phone}`,
    `Address: ${[form.address, form.city, form.region, form.postal, country?.name].filter(Boolean).join(', ')}`,
    form.notes ? `Design / notes: ${form.notes}` : '',
  ].filter((l) => l !== '').join('\n');

  const whatsapp = async (e) => {
    e.preventDefault();
    try { await navigator.clipboard.writeText(message); } catch { /* clipboard unavailable */ }
    showToast('Order details copied. Paste them in the WhatsApp chat.');
    window.open(BRAND.whatsapp, '_blank', 'noopener');
  };

  const payOnline = async () => {
    setBusy(true);
    try {
      const res = await createPayment({
        items: items.map((i) => ({ id: i.id, size: i.size, qty: i.qty })), // ids only: the server prices the order
        currency: STORE.baseCurrency,
        customer: { name: form.name, email: form.email, phone: `${country?.dial}${form.phone}` },
        shippingAddress: { line1: form.address, city: form.city, region: form.region, postal: form.postal, country: form.country },
      });
      if (res.redirectUrl) window.location.assign(res.redirectUrl);
    } finally {
      setBusy(false);
    }
  };

  const field = 'w-full border border-line px-4 py-3 text-[14px] outline-none focus:border-ink bg-white';
  const label = 'text-[11px] font-bold uppercase tracking-wider text-muted block mb-1';

  return (
    <div className="bg-mist py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <form onSubmit={whatsapp} className="lg:col-span-7 bg-white border border-line p-6 sm:p-10 space-y-5">
          <h1 className="font-display text-3xl">CHECKOUT</h1>

          {!user && (
            <p className="text-[13px] bg-mist border border-line px-3 py-2">
              Have an account? <Link to="/login" state={{ from: '/checkout' }} className="font-bold text-brandRed hover:underline">Sign in</Link> to fill in your details. You can also order as a guest.
            </p>
          )}

          <fieldset className="space-y-4">
            <legend className="font-display text-xl mb-2">CONTACT</legend>
            <div><label className={label} htmlFor="c-name">Full name</label><input id="c-name" required autoComplete="name" className={field} value={form.name} onChange={set('name')} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={label} htmlFor="c-email">Email</label><input id="c-email" type="email" required autoComplete="email" className={field} value={form.email} onChange={set('email')} /></div>
              <div>
                <label className={label} htmlFor="c-phone">Phone</label>
                <div className="flex">
                  <span className="px-3 flex items-center border border-r-0 border-line bg-mist text-[14px]">{country?.dial}</span>
                  <input id="c-phone" type="tel" required autoComplete="tel-national" className={field} value={form.phone} onChange={set('phone')} />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-xl mb-2">DELIVERY ADDRESS</legend>
            <div>
              <label className={label} htmlFor="c-country">Country</label>
              <select id="c-country" className={field} value={form.country} onChange={set('country')} autoComplete="country">
                {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            </div>
            {international && (
              <p className="flex gap-2 text-[13px] bg-gold/20 border border-gold px-3 py-2">
                <Globe className="w-4 h-4 shrink-0 mt-0.5" />
                {shippable
                  ? 'International order: shipping charges and any import duties or taxes will be confirmed before you pay.'
                  : 'We are setting up shipping to this country. Send your order request and we will confirm if and how we can deliver.'}
              </p>
            )}
            <div><label className={label} htmlFor="c-addr">Street address</label><input id="c-addr" required autoComplete="address-line1" className={field} value={form.address} onChange={set('address')} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><label className={label} htmlFor="c-city">City</label><input id="c-city" required autoComplete="address-level2" className={field} value={form.city} onChange={set('city')} /></div>
              <div><label className={label} htmlFor="c-region">State / Province</label><input id="c-region" autoComplete="address-level1" className={field} value={form.region} onChange={set('region')} /></div>
              <div><label className={label} htmlFor="c-postal">PIN / Postal code</label><input id="c-postal" required autoComplete="postal-code" className={field} value={form.postal} onChange={set('postal')} /></div>
            </div>
            <div><label className={label} htmlFor="c-notes">Design idea, names or text to print (optional)</label><textarea id="c-notes" rows={3} className={field} value={form.notes} onChange={set('notes')} /></div>
          </fieldset>

          {/* PAYMENT */}
          <fieldset className="space-y-3">
            <legend className="font-display text-xl mb-2">PAYMENT</legend>
            {isPaymentConfigured() ? (
              <>
                <button type="button" onClick={payOnline} disabled={busy || !shippable}
                  className="w-full py-4 rounded-full bg-button-grad text-white font-bold text-[13px] uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60 flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" /> Pay securely online
                </button>
                <p className="flex items-center gap-2 text-[12px] text-muted"><Lock className="w-3.5 h-3.5" /> Card details are entered on our payment partner's secure page. We never see or store them.</p>
              </>
            ) : (
              <p className="flex gap-2 text-[13px] bg-mist border border-line px-3 py-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-muted" />
                Online card payment is coming soon. For now, send your order on WhatsApp and we will share secure payment details.
              </p>
            )}
            <button type="submit" className="w-full py-4 rounded-full bg-whatsapp text-white font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110">
              <WhatsAppIcon className="w-5 h-5" /> Copy order &amp; open WhatsApp
            </button>
          </fieldset>
        </form>

        <aside className="lg:col-span-5 bg-white border border-line p-6 h-fit">
          <h2 className="font-display text-2xl mb-4">ORDER SUMMARY</h2>
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i.key} className="flex gap-3">
                <ProductImage src={i.image} alt={i.name} label="" className="w-16 h-20 object-cover shrink-0" />
                <div className="flex-1 text-[13px]">
                  <p className="font-display text-base leading-tight">{i.name}</p>
                  <p className="text-muted">Size {i.size} × {i.qty}</p>
                </div>
                <span className="font-bold text-[14px]">₹{(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-line mt-5 pt-4 font-bold"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <p className="text-[12px] text-muted mt-2">Shipping{international ? ', duties and taxes' : ''} confirmed before you pay.</p>
        </aside>
      </div>
    </div>
  );
}
