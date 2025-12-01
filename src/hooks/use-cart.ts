import { useState, useEffect } from "react";

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  priceType: string;
  unitPrice: number;
  productType: "original" | "eco";
}

const SHARED_CART_STORAGE_KEY = "shared_cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initialize cart from localStorage
    try {
      const savedCart = localStorage.getItem(SHARED_CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SHARED_CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = (
    productId: string,
    productName: string,
    quantity: number,
    priceType: string,
    unitPrice: number,
    productType: "original" | "eco"
  ) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.productId === productId && item.priceType === priceType
      );

      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId && item.priceType === priceType
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        { productId, productName, quantity, priceType, unitPrice, productType },
      ];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };
};
