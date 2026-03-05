import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Category filter updates visible products (integration)", async () => {
  const user = userEvent.setup();
  render(<App />);

  // initial category in App is "chairs"
  expect(screen.getByText("linea")).toBeInTheDocument();
  expect(screen.getByText("frame")).toBeInTheDocument();

  // switch to armchairs
  await user.click(screen.getByRole("button", { name: "armchairs" }));

  // armchairs expected:
  expect(screen.getByText("heritage")).toBeInTheDocument();
  expect(screen.getByText("comfa")).toBeInTheDocument();

  // chairs should disappear
  expect(screen.queryByText("linea")).not.toBeInTheDocument();
});

test("Material filter + add to cart updates CartSummary (integration)", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Filter material to Oak
  await user.click(screen.getByRole("button", { name: "Oak" }));

  // In chairs category, Oak should include "linea"
  expect(screen.getByText("linea")).toBeInTheDocument();

  // Add linea to cart
  await user.click(screen.getByRole("button", { name: /add linea to cart/i }));

  expect(screen.getByLabelText("Cart total items")).toHaveTextContent("1");
  expect(screen.getByLabelText("Cart total price")).toHaveTextContent("$420");
});

test("Price slider filters out expensive items (interaction)", async () => {
  const user = userEvent.setup();
  render(<App />);

  // chairs category includes "frame" (450) and "linea"(420) both <= 500
  expect(screen.getByText("linea")).toBeInTheDocument();
  expect(screen.getByText("frame")).toBeInTheDocument();

  // reduce max price to 430 -> should remove frame (450) but keep linea (420)
  const slider = screen.getByLabelText("Max price");
  await user.clear(slider); // harmless on range
  // set range via pointer-like action: directly set value and fire change
  slider.value = 430;
  await userEvent.setup().click(slider); // ensure event loop
  slider.dispatchEvent(new Event("change", { bubbles: true }));

  expect(screen.getByText("linea")).toBeInTheDocument();
  expect(screen.queryByText("frame")).not.toBeInTheDocument();
});