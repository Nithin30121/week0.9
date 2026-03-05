import React from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="nav">
      <div className="brand">b.</div>
      <div className="nav-center">menu ▾</div>

      <button className="cartBtn" aria-label="Open cart">
        🛒
        <span className="cartBadge" aria-label="Cart item count">
          {totalItems}
        </span>
      </button>
    </header>
  );
}