import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'cocktail_custom_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);
  const [toast, setToast] = useState(null);
  const [flyingItem, setFlyingItem] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  const triggerFlyToCart = (startRect, imageSrc) => {
    if (!startRect) return;
    setFlyingItem({
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      imageSrc,
    });

    // Reset fly item after animation
    setTimeout(() => {
      setFlyingItem(null);
      setBadgeBump(true);
      setTimeout(() => setBadgeBump(false), 450);
      setIsCartOpen(true);
    }, 750);
  };

  const addToCart = (product, size = 'M', qty = 1, e = null) => {
    const price = product.price;
    const mrp = product.mrp;
    const key = `${product.id}-${size}`;

    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerFlyToCart(rect, product.images[0]);
    } else {
      setBadgeBump(true);
      setTimeout(() => setBadgeBump(false), 450);
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === key);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qty,
        };
        return updated;
      } else {
        return [
          {
            key,
            id: product.id,
            slug: product.slug,
            name: product.name,
            tagline: product.tagline,
            category: product.category,
            image: product.images[0],
            size,
            price,
            mrp,
            qty,
            product,
          },
          ...prev,
        ];
      }
    });

    showToast(`Added ${product.name} (${size}) to bag`);
  };

  const updateQty = (key, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
    showToast('Item removed from bag');
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeDeliveryThreshold = 1499;
  const isFreeDeliveryUnlocked = subtotal >= freeDeliveryThreshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        freeDeliveryThreshold,
        isFreeDeliveryUnlocked,
        remainingForFreeDelivery,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        badgeBump,
        toast,
        showToast,
        flyingItem,
        triggerFlyToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
