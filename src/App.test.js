import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Spacestagram/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders navbar', () => {
  render(<App />);
  const navbarElement = screen.getByText(/Page \d/i);
  expect(navbarElement).toBeInTheDocument();
});

test('renders 9 skeleton elements', () => {
  render(<App />);
  const cardElement = screen.getAllByTestId('skeleton');
  expect(cardElement.length).toBe(9);
  for (const element of cardElement) {
    expect(element).toBeInTheDocument();
  }
})
