import { createContext, useContext, useState, type ReactElement } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity?: number
};


interface CartItem extends Product {
  quantity: number;
}

type ContextType = {
    addToCart: (productId: number, quantity: number, product: Product) => void
    totalCount: number 
    removeFromCart: (productId: number) => void
    updateCart: (productId: number, newQuantity: number) => void
    cartItems: CartItem[];
    handleIncrementInBusket: (id: number, quantity: number) => void
    handleDecrementInBusket: (id: number, quantity: number) => void
} 


const CartContext = createContext<ContextType | null>(null)

type CardProviderType = {
    children: ReactElement
}

export default function CartProvider ({ children }: CardProviderType) {
    const [ cartItems, setCartItems ] = useState<CartItem[]>([]);

    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    

    const addToCart = (productId: number, quantity: number, product: Product) => {
        setCartItems(prev => {
        const existingItem = prev.find(item => item.id === productId);
        
        if (existingItem) {
            return prev.map(item =>
                item.id === productId
                    ? { ...item, 
                        quantity: (item.quantity || 0) + quantity }
                    : item
                );    
        }

        return [...prev, {...product, quantity}];
        });
    };

    const updateCart = (productId: number, newqQuantity: number) => {
        setCartItems(prev => {
            return prev.map(item =>
                item.id === productId ? { ...item, quantity: newqQuantity } : item
            );
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prev => {
            return prev.filter(item => item.id !== productId);
        });
    };

    const handleIncrementInBusket = (id: number, quantity: number) => {
        updateCart(id, quantity + 1)
    }

    const handleDecrementInBusket = (id: number, quantity: number) => {
        if (quantity > 1) {
            updateCart(id, quantity - 1)
        } else {
            removeFromCart(id)
        }
    }


    const contextValue: ContextType = {
        addToCart, 
        updateCart, 
        removeFromCart, 
        totalCount, 
        cartItems, 
        handleIncrementInBusket, 
        handleDecrementInBusket 
    }

    return (
        <CartContext.Provider 
            value={contextValue}
        >
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used inside the CartProvider")
    }
    return context
}
        
  