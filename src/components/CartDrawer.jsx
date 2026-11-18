import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const {
    items,
    totalCount,
    subtotal,
    freeDeliveryThreshold,
    isFreeDeliveryUnlocked,
    remainingForFreeDelivery,
    isCartOpen,
    closeCart,
    updateQty,
    removeItem,
    addToCart,
  } = useCart();

  const navigate = useNavigate();

  // Find a product that isn't currently in the cart for upsell
  const upsellProduct =
    PRODUCTS.find((p) => !items.some((i) => i.id === p.id && true) && p.inStock) ||
    PRODUCTS[1];

  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Cart Drawer from Right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.2, 0.75, 0.2, 1] }}
            className="absolute top-0 right-0 h-full w-full max-w-[440px] bg-white shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-5 border-b border-line flex items-center justify-between bg-mist/60">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brandRed" />
                <h3 className="font-display text-xl text-ink">
                  YOUR BAG ({totalCount})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 hover:bg-white rounded-full transition-colors group"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-ink group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="px-5 py-3.5 bg-ink text-white border-b border-black">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                <span>
                  {isFreeDeliveryUnlocked ? (
                    <span className="text-gold flex items-center gap-1">
                      YOU'VE UNLOCKED FREE DELIVERY
                    </span>
                  ) : (
                    `₹${remainingForFreeDelivery} away from free delivery`
                  )}
                </span>
                <span className="text-white/60">GOAL: ₹{freeDeliveryThreshold}</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.7, ease: [0.2, 0.75, 0.2, 1] }}
                  className="h-full bg-signature-grad"
                />
              </div>
            </div>

            {/* Cart Body */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-mist flex items-center justify-center mb-4 border border-line">
                  <ShoppingBag className="w-10 h-10 text-muted" />
                </div>
                <h4 className="font-display text-2xl text-ink mb-1">
                  YOUR BAG IS EMPTY
                </h4>
                <p className="text-muted text-[13px] max-w-xs mb-6">
                  Explore our custom printed shirts, T-shirts, hoodies and caps.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                  <Link
                    to="/shop?filter=Bestsellers"
                    onClick={closeCart}
                    className="flex-1 py-3 px-4 rounded-full bg-ink text-white font-bold text-[12px] uppercase tracking-wider hover:bg-brandRed transition-colors text-center"
                  >
                    Bestsellers
                  </Link>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="flex-1 py-3 px-4 rounded-full border border-ink text-ink font-bold text-[12px] uppercase tracking-wider hover:bg-ink hover:text-white transition-colors text-center"
                  >
                    Shop All
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-line">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24, height: 0 }}
                      transition={{ duration: 0.55, ease: [0.2, 0.75, 0.2, 1] }}
                      className="py-4 flex gap-3.5 items-start"
                    >
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="w-20 h-24 bg-mist border border-line overflow-hidden shrink-0 group block"
                      >
                        <ProductImage
                          src={item.image}
                          alt={item.name}
                          label={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <Link
                              to={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="font-display text-lg text-ink hover:text-brandRed transition-colors block truncate"
                            >
                              {item.name}
                            </Link>
                            <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-muted">
                              SIZE: <span className="text-ink">{item.size}</span>
                            </span>
                          </div>
                          <button
                            onClick={() => removeItem(item.key)}
                            className="text-muted hover:text-brandRed p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price & Stepper */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Stepper */}
                          <div className="flex items-center border border-line bg-mist rounded-[10px] overflow-hidden">
                            <button
                              onClick={() => updateQty(item.key, -1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white text-ink transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[12px] font-bold text-ink">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.key, 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white text-ink transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-[15px] text-ink">
                              ₹{(item.price * item.qty).toLocaleString()}
                            </div>
                            {item.mrp > item.price && (
                              <div className="text-[11px] text-muted line-through">
                                ₹{(item.mrp * item.qty).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Upsell Row: "Pairs well with" */}
                {upsellProduct && (
                  <div className="pt-4 pb-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted mb-2 flex items-center gap-1.5">
                      PAIRS WELL WITH
                    </p>
                    <div className="bg-mist p-3 border border-line flex items-center gap-3">
                      <ProductImage
                        src={upsellProduct.images[0]}
                        alt={upsellProduct.name}
                        label=""
                        className="w-12 h-14 object-cover border border-line"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-display text-sm text-ink truncate">
                          {upsellProduct.name}
                        </h5>
                        <p className="text-[11px] text-muted">
                          ₹{upsellProduct.price}
                        </p>
                      </div>
                      <button
                        onClick={(e) => addToCart(upsellProduct, upsellProduct.sizes[0], 1, e)}
                        className="px-3 py-1.5 rounded-full bg-ink text-white font-bold text-[11px] uppercase tracking-wider hover:bg-brandRed transition-colors shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-line bg-mist/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold uppercase tracking-wider text-muted">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-ink">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-muted">
                  <ShieldCheck className="w-3.5 h-3.5 text-brandRed" />
                  <span>Taxes included. Free insured delivery over ₹999.</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-full bg-button-grad text-white font-bold text-[14px] uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brandRed/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
