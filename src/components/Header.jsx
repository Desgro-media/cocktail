import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalCount, openCart, badgeBump } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'SHOP', path: '/shop', hasMega: true },
    { name: 'ABOUT US', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full h-[66px] bg-white border-b border-line transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : ''
        }`}
      >
        <div className="max-w-[1320px] h-full mx-auto px-4 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-ink hover:bg-brand rounded-full transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <BrandLogo />
          </div>

          <nav className="hidden lg:flex items-center gap-8 h-full">
            {navLinks.map((item) => (
              <div
                key={item.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.hasMega && setIsMegaMenuOpen(true)}
              >
                <Link
                  to={item.path}
                  className={`relative text-[14px] font-semibold uppercase tracking-[0.12em] py-2 transition-colors ${
                    location.pathname === item.path ? 'text-ink' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand origin-left transition-transform duration-350 ease-luxury ${
                      location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}
                  />
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-ink transition-colors rounded-full hover:bg-brand cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to={user ? '/account' : '/login'}
              className="relative p-2 text-ink transition-colors rounded-full hover:bg-brand"
              aria-label={user ? 'My account' : 'Sign in'}
            >
              <User className="w-5 h-5" />
              {user && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-whatsapp" />}
            </Link>
            <button
              id="header-bag-btn"
              onClick={openCart}
              className="relative p-2 text-ink transition-colors rounded-full hover:bg-brand cursor-pointer group"
              aria-label={`Bag with ${totalCount} items`}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalCount > 0 && (
                <motion.span
                  key={totalCount}
                  initial={{ scale: 0 }}
                  animate={badgeBump ? { scale: [1, 1.55, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.75, 0.2, 1] }}
                  className="absolute -top-0.5 -right-0.5 min-w-[19px] h-[19px] px-1 rounded-full bg-brand text-ink text-[11px] font-bold flex items-center justify-center leading-none shadow-sm"
                >
                  {totalCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
        </AnimatePresence>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
