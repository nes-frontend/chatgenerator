import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  render(<App />);
  const linkElement = screen.getByText(/誰かに何かを話してもらうアプリ/i);
  expect(linkElement).toBeInTheDocument();
});
