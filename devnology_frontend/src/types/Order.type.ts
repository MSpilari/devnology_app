import { Product } from "./Product.type";

type Order = {
  id: string;
  customerName: string;
  createdAt: string;
  total: number;
  products: Product[];
};

type OrderResponse = {
  orders: Order[];
};

export type { Order, OrderResponse };
