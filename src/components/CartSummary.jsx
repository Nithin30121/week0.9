import React from "react";
import { useCart } from "../context/CartContext";

export default function CartSummary() {
  const { totalItems, totalPrice, clearCart } = useCart();

  return (
    <section className="cartSummary" aria-label="Cart summary">
      <div className="cartLine">
        <span>Items</span>
        <strong aria-label="Cart total items">{totalItems}</strong>
      </div>
      <div className="cartLine">
        <span>Total</span>
        <strong aria-label="Cart total price">${totalPrice}</strong>
      </div>
      <button type="button" className="clearBtn" onClick={clearCart}>
        clear
      </button>
    </section>
  );
}