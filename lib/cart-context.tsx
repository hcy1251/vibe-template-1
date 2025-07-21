'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, CartState, Product } from '@/types/product'
import { calculateCartTotal } from '@/lib/utils'

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * item.price_in_cents
              }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price_in_cents: product.price_in_cents,
          image_url: product.image_url,
          quantity,
          subtotal: quantity * product.price_in_cents
        }
        newItems = [...state.items, newItem]
      }
      
      return {
        items: newItems,
        total: calculateCartTotal(newItems),
        itemCount: newItems.reduce((count, item) => count + item.quantity, 0)
      }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.productId)
      return {
        items: newItems,
        total: calculateCartTotal(newItems),
        itemCount: newItems.reduce((count, item) => count + item.quantity, 0)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId } })
      }
      
      const newItems = state.items.map(item =>
        item.id === productId
          ? { 
              ...item, 
              quantity,
              subtotal: quantity * item.price_in_cents
            }
          : item
      )
      
      return {
        items: newItems,
        total: calculateCartTotal(newItems),
        itemCount: newItems.reduce((count, item) => count + item.quantity, 0)
      }
    }
    
    case 'CLEAR_CART': {
      return {
        items: [],
        total: 0,
        itemCount: 0
      }
    }
    
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  }
  
  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  }
  
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  return (
    <CartContext.Provider 
      value={{ 
        state, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}