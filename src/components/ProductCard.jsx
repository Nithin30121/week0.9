import React, { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => addToCart(product, qty);

  return (
    <article className="card" aria-label={`Product ${product.name}`}>
      <div className="cardImg">
        <img src={product.imageUrl} alt={product.name} />
        <button
          type="button"
          className="iconBtn"
          aria-label={`Add ${product.name} to cart`}
          onClick={handleAdd}
          disabled={!product.inStock}
          title={product.inStock ? "Add to cart" : "Out of stock"}
        >
          🛒
        </button>
      </div>

      <div className="cardMeta">
        <div className="cardName">{product.name}</div>
        <div className="cardPrice">${product.price}</div>
      </div>

      <div className="cardBottom">
        <span className={`stock ${product.inStock ? "ok" : "no"}`}>
          {product.inStock ? "in stock" : "on request"}
        </span>

        <QuantitySelector value={qty} onChange={setQty} min={1} max={10} />
      </div>
    </article>
  );
}