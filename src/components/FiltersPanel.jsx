import React from "react";

const MATERIALS = ["All", "Oak", "Walnut", "Ash", "Beech"];

export default function FiltersPanel({
  material,
  setMaterial,
  maxPrice,
  setMaxPrice,
  itemCount,
  setItemCount,
}) {
  return (
    <aside className="filters" aria-label="Filters panel">
      <div className="filterBlock">
        <div className="filterTitle">Wood</div>
        <div className="filterList">
          {MATERIALS.map((m) => (
            <button
              key={m}
              type="button"
              className={`filterItem ${material === m ? "active" : ""}`}
              onClick={() => setMaterial(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="filterBlock">
        <div className="filterTitle">price (max)</div>
        <label className="rangeRow">
          <span aria-label="Max price label">${maxPrice}</span>
          <input
            aria-label="Max price"
            type="range"
            min={200}
            max={1500}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="filterBlock">
        <div className="filterTitle">item count in the set</div>
        <label className="rangeRow">
          <span aria-label="Item count label">{itemCount}</span>
          <input
            aria-label="Item count"
            type="range"
            min={1}
            max={12}
            step={1}
            value={itemCount}
            onChange={(e) => setItemCount(Number(e.target.value))}
          />
        </label>
      </div>
    </aside>
  );
}