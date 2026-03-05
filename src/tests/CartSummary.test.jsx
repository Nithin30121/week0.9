import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";

function TestAddButtons() {
  const { addToCart } = useCart();
  return (
    <div>
      <button onClick={() => addToCart({ id: "a", price: 100 }, 2)}>addA</button>
      <button onClick={() => addToCart({ id: "b", price: 50 }, 1)}>addB</button>
    </div>
  );
}

test("CartSummary shows total items and total price correctly", async () => {
  const user = userEvent.setup();
  render(
    <CartProvider>
      <TestAddButtons />
      <CartSummary />
    </CartProvider>
  );

  await user.click(screen.getByText("addA")); // 2 * 100
  await user.click(screen.getByText("addB")); // 1 * 50

  expect(screen.getByLabelText("Cart total items")).toHaveTextContent("3");
  expect(screen.getByLabelText("Cart total price")).toHaveTextContent("$250");
});