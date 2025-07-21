export interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
  description?: string;
  category?: string;
  in_stock?: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
  quantity: number;
  subtotal: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CheckoutForm {
  customerName: string;
  phone: string;
  email: string;
  storeLocation: string;
  paymentMethod: 'cash' | 'card';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: CheckoutForm;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}