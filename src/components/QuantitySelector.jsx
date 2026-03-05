import React from "react";

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="qty" aria-label="Quantity selector">
      <button type="button" aria-label="Decrease quantity" onClick={dec}>
        −
      </button>
      <span aria-label="Quantity value">{value}</span>
      <button type="button" aria-label="Increase quantity" onClick={inc}>
        +
      </button>
    </div>
  );
}