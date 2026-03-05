import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantitySelector from "../components/QuantitySelector";

test("increase and decrease quantity within bounds", async () => {
  const user = userEvent.setup();
  let value = 1;

  const onChange = (v) => { value = v; rerenderUI(); };

  const { rerender } = render(
    <QuantitySelector value={value} onChange={onChange} min={1} max={3} />
  );

  const rerenderUI = () => rerender(<QuantitySelector value={value} onChange={onChange} min={1} max={3} />);

  expect(screen.getByLabelText("Quantity value")).toHaveTextContent("1");

  await user.click(screen.getByLabelText("Increase quantity"));
  expect(screen.getByLabelText("Quantity value")).toHaveTextContent("2");

  await user.click(screen.getByLabelText("Increase quantity"));
  expect(screen.getByLabelText("Quantity value")).toHaveTextContent("3");

  // should not exceed max=3
  await user.click(screen.getByLabelText("Increase quantity"));
  expect(screen.getByLabelText("Quantity value")).toHaveTextContent("3");

  await user.click(screen.getByLabelText("Decrease quantity"));
  expect(screen.getByLabelText("Quantity value")).toHaveTextContent("2");

  await user.click(screen.getByLabelText("Decrease quantity"));
  await user.click(screen.getByLabelText("Decrease quantity"));
  // should not go below min=1
  expect(screen.getByLabelText("Quantity value")).toHaveTextContent("1");
});