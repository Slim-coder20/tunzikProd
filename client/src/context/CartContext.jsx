import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

// Hook utilitaire pour consommer le context
export const useCart = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  // Initialisation depuis localStorage pour persister le panier entre les sessions
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("tunzik_cart");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Synchroniser avec localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("tunzik_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Ajouter un album (ou incrémenter sa quantité)
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.success("Album ajouté au panier");
  };

  // Décrémenter la quantité, supprimer si elle atteint 0
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      if (prev[itemId] <= 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });
  };

  // Vider le panier
  const clearCart = () => {
    setCartItems({});
  };

  // Nombre total d'articles dans le panier
  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
