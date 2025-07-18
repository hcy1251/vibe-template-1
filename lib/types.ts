export interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
  description: string;
  category: string;
  inStock: boolean;
  stock: number;
}

export interface CartItem {
  id: number;
  name: string;
  price_in_cents: number;
  quantity: number;
  image_url: string;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  email: string;
  storeLocation: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}