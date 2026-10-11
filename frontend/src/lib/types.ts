export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  sizes: string | null;
  stock: number;
  featured: boolean;
  active: boolean;
  category: Category;
}

export interface ProductListResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface OrderCustomer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export interface Order {
  id: string;
  code: string;
  status: string;
  total: number;
  customer: OrderCustomer;
  items: OrderItem[];
  createdAt: string;
}

export interface CreateOrderPayload {
  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  items: { productId: string; quantity: string }[];
}