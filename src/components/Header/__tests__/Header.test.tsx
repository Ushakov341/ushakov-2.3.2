import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Header } from '../Header';
import { CartState } from '../../../types';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockCart: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

const renderWithMantine = (component: React.ReactNode) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('Header', () => {
  const mockHandlers = {
    onUpdateQuantity: vi.fn(),
    onRemoveFromCart: vi.fn(),
    onClearCart: vi.fn()
  };

  beforeEach(() => {
    Object.values(mockHandlers).forEach(fn => fn.mockClear());
  });

  it('renders header with site name', () => {
    renderWithMantine(
      <Header cart={mockCart} {...mockHandlers} />
    );

    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
  });

  it('shows cart icon', () => {
    renderWithMantine(
      <Header cart={mockCart} {...mockHandlers} />
    );

    const cartIcon = screen.getByRole('button');
    expect(cartIcon).toBeInTheDocument();
  });

  it('displays empty cart message when cart is empty', () => {
    renderWithMantine(
      <Header cart={mockCart} {...mockHandlers} />
    );

    const cartButton = screen.getByRole('button');
    fireEvent.click(cartButton);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });
});