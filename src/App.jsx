import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Global Components
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import TrustBar from './components/TrustBar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Toast from './components/Toast';
import FlyToCart from './components/FlyToCart';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import FaqPage from './pages/FaqPage';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Account from './pages/Account';

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-brandRed selection:text-white">
      <Preloader />
      <ScrollToTop />

      {/* Global Elements */}
      <AnnouncementBar />
      <Header />
      <CartDrawer />
      <FlyToCart />
      <WhatsAppFloat />
      <Toast />

      {/* Main Routes with Animated Page Transition: fade in + translateY(14px -> 0) 0.6s */}
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.2, 0.75, 0.2, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policy/:type" element={<Policy />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Trust Bar & Footer on every page */}
      <TrustBar />
      <Footer />
    </div>
  );
}
