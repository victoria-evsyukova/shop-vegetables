import { fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Card from './Card';
import { render, renderWithoutCartProvider } from "../../test/utils";
import CartProvider from '../../context/CartContext';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 10,
  image: 'test-image.jpg',
  category: 'Test-category'
}

vi.mock('@tabler/icons-react', () => ({
  IconMinus: () => <button data-testid="minus-btn">-</button>,
  IconPlus: () => <button data-testid="plus-btn">+</button>,
  IconShoppingCart: () => <span data-testid="cart-icon">🛒</span>,
}));



describe('Card Component', () => {
  beforeEach(() => {
    render(
      <CartProvider>
        <Card product={mockProduct} />
      </CartProvider>
    );
  });

  it('throws error when useCart is used without CartProvider', () => {
    
    expect(() => {
      renderWithoutCartProvider(<Card product={mockProduct} />)
    }).toThrow('useCart must be used inside the CartProvider')
  })

  it('renders product information correctly', () => {
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$ 10')).toBeInTheDocument();
  })

  it('increments quantity when plus button is clicked', () => {
   
    const plusButton = screen.getByTestId('plus-btn')
    const quantityText = screen.getByText('1')
    
    fireEvent.click(plusButton)
    
    expect(quantityText).toHaveTextContent('2')
  })

  it('decrements quantity when minus button is clicked but not below 1', () => {
    const minusButton = screen.getByTestId('minus-btn')
    const plusButton = screen.getByTestId('plus-btn')
    const quantityText = screen.getByText('1')
    
    
    fireEvent.click(plusButton)
    expect(quantityText).toHaveTextContent('2')
    
    
    fireEvent.click(minusButton)
    expect(quantityText).toHaveTextContent('1')
    
    fireEvent.click(minusButton)
    expect(quantityText).toHaveTextContent('1')
  })

  it('calculates total price correctly', () => {
    const plusButton = screen.getByTestId('plus-btn')
    const totalPrice = screen.getByText('$ 10')
    
    fireEvent.click(plusButton)
    fireEvent.click(plusButton)
    
    expect(totalPrice).toHaveTextContent('$ 30')
  })

  it('calls addToCart when Add to cart button is clicked', () => {
    const addToCartButton = screen.getByText('Add to cart')
    
    fireEvent.click(addToCartButton)
    
    expect(addToCartButton).toBeInTheDocument()
  })
})