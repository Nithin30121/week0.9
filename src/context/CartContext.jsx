import React, { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action.payload;
      const existing = state.items[product.id];
      const newQty = (existing?.qty ?? 0) + qty;
      return {
        ...state,
        items: {
          ...state.items,
          [product.id]: { product, qty: newQty },
        },
      };
    }
    case "REMOVE": {
      const { productId } = action.payload;
      const copy = { ...state.items };
      delete copy[productId];
      return { ...state, items: copy };
    }
    case "CLEAR":
      return { ...state, items: {} };
    default:
      return state;
  }
}

const initialState = { items: {} };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const api = useMemo(() => {
    const itemsArray = Object.values(state.items);

    const totalItems = itemsArray.reduce((sum, it) => sum + it.qty, 0);
    const totalPrice = itemsArray.reduce((sum, it) => sum + it.qty * it.product.price, 0);

    return {
      items: state.items,
      totalItems,
      totalPrice,
      addToCart: (product, qty = 1) =>
        dispatch({ type: "ADD", payload: { product, qty } }),
      removeFromCart: (productId) =>
        dispatch({ type: "REMOVE", payload: { productId } }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}