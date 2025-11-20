import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './Header';
import CartProvider from '../../context/CartContext';
import { render } from "../../test/utils";


vi.mock('@tabler/icons-react', () => ({
  IconShoppingCart: () => <span data-testid="cart-icon">🛒</span>,
}));


const mockUseCart = vi.fn();

vi.mock('../CartContext', async () => {
  const actual = await vi.importActual('../CartContext');
  return {
    ...actual,
    useCart: () => mockUseCart(),
  };
});




describe('Header Component', () => {
    const defaultProps = {
        onClick: vi.fn(),
    };

    beforeEach(() => {
        mockUseCart.mockReturnValue({
            cartItems: [],
            totalCount: 0,
        });
    });


    it('renders header with logo and buttons', () => {
        render(
            <CartProvider>
                <Header {...defaultProps} />
            </CartProvider>
            );

        expect(screen.getByText('Vegetable')).toBeInTheDocument();
        expect(screen.getByText('SHOP')).toBeInTheDocument();
        expect(screen.getByText('Cart')).toBeInTheDocument();
    });

    it('shows cart count badge when count is greater than 0', () => {
        mockUseCart.mockReturnValue({
            cartItems: [],
            totalCount: 5,
        });
        
        render(
            <CartProvider>
                <Header {...defaultProps}/>
            </CartProvider>
        );

    expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('does not show cart count badge when count is 0', () => {
        render(
            <CartProvider>
                <Header {...defaultProps}/>
            </CartProvider>
        );

        expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('calls onCartClick when cart button is clicked', () => {
        const mockOnCartClick = vi.fn();

        render(
            <CartProvider>
                <Header {...defaultProps} onClick={mockOnCartClick} />
            </CartProvider>
        );

        const cartButton = screen.getByText('Cart');
        fireEvent.click(cartButton);

        expect(mockOnCartClick).toHaveBeenCalledTimes(1);
    });

});