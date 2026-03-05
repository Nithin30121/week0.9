import React, { useMemo, useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CategoryFilter from "./components/CategoryFilter";
import FiltersPanel from "./components/FiltersPanel";
import ProductList from "./components/ProductList";
import CartSummary from "./components/CartSummary";
import { products as seed } from "./data/products";
import "./index.css";

function applyFilters(all, { category, material, maxPrice }) {
  return all.filter((p) => {
    const okCategory = category === "all" ? true : p.category === category;
    const okMaterial = material === "All" ? true : p.material === material;
    const okPrice = p.price <= maxPrice;
    return okCategory && okMaterial && okPrice;
  });
}

export default function App() {
  const [category, setCategory] = useState("chairs");
  const [material, setMaterial] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [itemCount, setItemCount] = useState(1); // displayed but not applied (still testable)

  const filtered = useMemo(
    () => applyFilters(seed, { category, material, maxPrice }),
    [category, material, maxPrice]
  );

  return (
    <CartProvider>
      <div className="page">
        <Navbar />

        <main className="main">
          <HeroSection />

          <section className="catalogHead">
            <div>
              <div className="kicker">04/ catalog</div>
              <h2 className="title">what we provide</h2>
            </div>

            <p className="sub">
              check out our customers&apos; favorite items. we are confident that you can choose
              your new friend here
            </p>
          </section>

          <CategoryFilter value={category} onChange={setCategory} />

          <div className="layout">
            <FiltersPanel
              material={material}
              setMaterial={setMaterial}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              itemCount={itemCount}
              setItemCount={setItemCount}
            />

            <div className="content">
              <ProductList products={filtered} />
              <CartSummary />
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  );
}