import React from 'react';
import { useParams, Link } from 'react-router-dom';

const POLICY_DATA = {
  shipping: {
    title: 'SHIPPING POLICY',
    subtitle: 'All India shipping from Trivandrum',
    updated: 'November 2026',
    sections: [
      {
        h2: '1. Made to order',
        content:
          'Most of our products are printed to order in Trivandrum, Kerala. Production and dispatch timelines are confirmed with you on WhatsApp when you place your order.',
      },
      {
        h2: '2. Shipping across India',
        content:
          'We ship all over India. Delivery charges and estimated delivery time depend on your location and are confirmed before you pay.',
      },
    ],
  },
  refund: {
    title: 'RETURNS & REPLACEMENTS',
    subtitle: 'Custom products',
    updated: 'November 2026',
    sections: [
      {
        h2: '1. Custom printed items',
        content:
          'Because every item is printed to your design, please check the design, text and sizes carefully before confirming your order.',
      },
      {
        h2: '2. Damaged or wrong item',
        content:
          'If your order arrives damaged or not as confirmed, message us on WhatsApp or Instagram with photos as soon as you receive it and we will sort it out.',
      },
    ],
  },
  privacy: {
    title: 'PRIVACY POLICY',
    subtitle: 'How we use your details',
    updated: 'November 2026',
    sections: [
      {
        h2: '1. What we collect',
        content:
          'Your name, phone number and delivery address, only to process and deliver your order.',
      },
      {
        h2: '2. Sharing',
        content:
          'We do not sell your personal information. It is shared only with delivery partners to complete your order.',
      },
    ],
  },
  terms: {
    title: 'TERMS OF SERVICE',
    subtitle: 'Using this website',
    updated: 'November 2026',
    sections: [
      {
        h2: '1. Orders',
        content:
          'An order is confirmed once we confirm the design, sizes, price and delivery details with you on WhatsApp or Instagram.',
      },
      {
        h2: '2. Designs',
        content:
          'Please only send designs you have the right to use. We may decline designs that infringe on others\' rights.',
      },
    ],
  },
};

export default function Policy() {
  const { type } = useParams();
  const currentKey = type && POLICY_DATA[type] ? type : 'shipping';
  const policy = POLICY_DATA[currentKey];

  return (
    <div className="bg-mist min-h-screen py-16 md:py-24">
      {/* Narrow Readable Column */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-line">
          {[
            { key: 'shipping', label: 'Shipping' },
            { key: 'refund', label: 'Replacements & Refunds' },
            { key: 'privacy', label: 'Privacy' },
            { key: 'terms', label: 'Terms' },
          ].map((tab) => (
            <Link
              key={tab.key}
              to={`/policy/${tab.key}`}
              className={`px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider transition-colors ${
                currentKey === tab.key
                  ? 'bg-ink text-white'
                  : 'bg-white text-ink border border-line hover:border-ink'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Content Header */}
        <div className="mb-12">
          <span className="inline-block bg-brand text-ink px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.22em] mb-2">
            {policy.subtitle} · Last Updated {policy.updated}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
            {policy.title}
          </h1>
        </div>

        {/* H2 Sections */}
        <div className="space-y-8 bg-white p-8 sm:p-12 border border-line shadow-sm">
          {policy.sections.map((sec, i) => (
            <section key={i} className="space-y-3">
              <h2 className="font-display text-2xl text-ink">
                {sec.h2}
              </h2>
              <p className="text-[15px] text-muted leading-relaxed">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* Bottom Help Card */}
        <div className="mt-10 p-6 bg-ink text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-display text-lg block">
              Have specific logistics questions?
            </span>
            <span className="text-[13px] text-white/70">
              Our Trivandrum studio team responds within minutes on WhatsApp.
            </span>
          </div>
          <a
            href="https://wa.me/message/ULSXJDDOUOVL1"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full bg-whatsapp text-white font-bold text-[12px] uppercase tracking-wider hover:brightness-110 shrink-0"
          >
            Chat with Concierge
          </a>
        </div>
      </div>
    </div>
  );
}
