import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../components/ProductCard";
import { CartProvider } from "../context/CartContext";

const product = {
  id: "p1",
  name: "linea",
  price: 420,
  category: "chairs",
  material: "Oak",
  inStock: true,
  imageUrl: "https://via.placeholder.com/300x200?text=linea",
};

function renderWithCart(ui) {
  return render(<CartProvider>{ui}</CartProvider>);
}

test("renders product props (name and price)", () => {
  renderWithCart(<ProductCard product={product} />);

  expect(screen.getByText("linea")).toBeInTheDocument();
  expect(screen.getByText("$420")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /linea/i })).toBeInTheDocument();
});

test("clicking add-to-cart adds item to cart (via navbar badge)", async () => {
  const user = userEvent.setup();

  // render ProductCard + Navbar badge indirectly by testing CartProvider state through summary approach:
  // easiest: add CartSummary to observe totals
  const CartSummary = (await import("../components/CartSummary")).default;

  render(
    <CartProvider>
      <ProductCard product={product} />
      <CartSummary />
    </CartProvider>
  );

  await user.click(screen.getByRole("button", { name: /add linea to cart/i }));

  expect(screen.getByLabelText("Cart total items")).toHaveTextContent("1");
  expect(screen.getByLabelText("Cart total price")).toHaveTextContent("$420");
});