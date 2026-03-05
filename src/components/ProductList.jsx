import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <section className="grid" aria-label="Product list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}