import React from "react";

const CATEGORIES = ["all", "chairs", "armchairs", "sofas", "dressers", "wardrobes", "shelves"];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="chips" aria-label="Category filter">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          type="button"
          className={`chip ${value === c ? "active" : ""}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}