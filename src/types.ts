export type Category = 'Bags';
export type Brand = 'Chris Bella' | 'Chanel';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  brand: Brand;
  image: string;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
