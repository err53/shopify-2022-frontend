import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("renders navbar text", () => {
  for (let i = 1; i <= 10; i++) {
    // render with router to avoid errors
    render(
      <MemoryRouter>
        <Navbar page={i} loading={false} data={{ photos: [] }} />
      </MemoryRouter>
    );
    const navbarElement = screen.getByText(`Page ${i}`);
    expect(navbarElement).toBeInTheDocument();
  }
});

test("renders navbar buttons", () => {
  render(
    <MemoryRouter>
      <Navbar page={1} loading={false} data={{ photos: [] }} />
    </MemoryRouter>
  );
  const prev = screen.getByTestId("navbar-prev");
  expect(prev).toBeInTheDocument();
  const next = screen.getByTestId("navbar-next");
  expect(next).toBeInTheDocument();
})
