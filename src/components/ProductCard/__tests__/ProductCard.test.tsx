import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types';
import { beforeEach, describe, expect, it } from 'vitest';

const mockProduct: Product = {
  id: 1,
  sku: 'test-sku',
  title: 'Test Vegetable',
  description: 'Test description',
  availabilityStatus: 'In Stock',
  category: 'vegetables',
  price: 50,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  tags: ['fresh'],
  brand: 'test',
  weight: 1,
  dimensions: { width: 10, height: 10, depth: 10 },
  warrantyInformation: '',
  shippingInformation: '',
  returnPolicy: '',
  minimumOrderQuantity: 1,
  meta: {
    createdAt: '',
    updatedAt: '',
    barcode: '',
    qrCode: ''
  },
  images: [],
  thumbnail: 'test-image.jpg'
};

const renderWithMantine = (component: React.ReactNode) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('ProductCard', () => {
  const mockOnAddToCart = vi.fn();

  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    expect(screen.getByText('Test Vegetable')).toBeInTheDocument();
    expect(screen.getByText('₹ 50')).toBeInTheDocument();
    expect(screen.getByText('1 kg')).toBeInTheDocument();
  });

  it('increases quantity when plus button is clicked', () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const plusButton = screen.getByLabelText(/increase/i) || 
                     screen.getAllByRole('button').find(btn => btn.querySelector('[data-testid="IconPlus"]'));
    
    if (plusButton) {
      fireEvent.click(plusButton);
    }

    const quantityInput = screen.getByDisplayValue('2');
    expect(quantityInput).toBeInTheDocument();
  });

  it('calls onAddToCart when Add to cart button is clicked', () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const addToCartButton = screen.getByText('Add to cart');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});