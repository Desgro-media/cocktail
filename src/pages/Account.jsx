import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Package, MapPin, ShieldCheck, LogOut, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../data/products';

export default function Account() {
  const { user, signOut, isDemo } = useAuth();
  if (!user) return <Navigate to="/login" state={{ from: '/account' }} replace />;

  const initials = (user.name || user.email).slice(0, 2).toUpperCase();

  return (
    <div className="bg-mist min-h-[70vh] py-10 md:py-16">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="w-16 h-16 rounded-full bg-ink text-white flex items-center justify-center font-display text-2xl">{initials}</span>
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight">HELLO, {(user.name || '').split(' ')[0].toUpperCase()}</h1>
              <p className="text-muted text-[14px]">{user.email}</p>
            </div>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-ink text-[12px] font-bold uppercase tracking-wider hover:bg-ink hover:text-white transition-colors self-start">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        {isDemo && <p className="mb-6 text-[12px] bg-gold/20 border border-gold px-3 py-2">Demo mode: this account lives only in your browser until a real login system is connected.</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <section className="md:col-span-2 bg-white border border-line p-6 md:p-8">
            <h2 className="font-display text-2xl flex items-center gap-2 mb-4"><Package className="w-5 h-5 text-brandRed" /> YOUR ORDERS</h2>
            <div className="border border-dashed border-line p-8 text-center">
              <p className="font-display text-xl mb-1">NO ORDERS YET</p>
              <p className="text-muted text-[14px] mb-5">When you place an order, you can follow it here.</p>
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-[12px] font-bold uppercase tracking-wider hover:bg-brandRed transition-colors">
                Start shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          <div className="space-y-4">
            <section className="bg-white border border-line p-6">
              <h2 className="font-display text-xl flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-brandRed" /> ADDRESSES</h2>
              <p className="text-muted text-[13px]">Saved addresses, including international ones, will appear here.</p>
            </section>
            <section className="bg-white border border-line p-6">
              <h2 className="font-display text-xl flex items-center gap-2 mb-2"><ShieldCheck className="w-5 h-5 text-brandRed" /> PRIVACY</h2>
              <p className="text-muted text-[13px] mb-3">You can ask us to export or delete your data at any time.</p>
              <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="text-[13px] font-bold text-brandRed hover:underline">Contact us about my data</a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
