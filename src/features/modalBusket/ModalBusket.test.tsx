import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ModalBusket from './ModalBusket';
import CartProvider from '../../context/CartContext';
import { render } from "../../test/utils";


vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ children, opened, onClose, ...props }: any) => 
      opened ? (
        <div data-testid="modal" {...props}>
          {children}
        </div>
      ) : null,
  };
});

describe('ModalBusket Component', () => {
  const defaultProps = {
    opened: true,
    onClose: vi.fn(),
  };

  it('renders modal when opened is true', () => {
    render(
      <CartProvider>
        <ModalBusket {...defaultProps} />
      </CartProvider>
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('does not render modal when opened is false', () => {
    render(
      <CartProvider>
        <ModalBusket {...defaultProps} opened={false} />
      </CartProvider>
    );

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('displays empty cart message and image', () => {
    render(
      <CartProvider>
        <ModalBusket {...defaultProps} />
      </CartProvider>
    );

    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });



  it('renders with correct accessibility attributes', () => {
    render(
      <CartProvider>
        <ModalBusket {...defaultProps} />
      </CartProvider>
    );

    const modal = screen.getByTestId('modal');
    expect(modal).toHaveAttribute('role', 'dialog');
  });
});