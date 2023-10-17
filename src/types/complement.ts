export interface ComplementItemProp {
  id: string;
  name: string;
  price: string;
  complementId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Complement {
  id: string;
  name: string;
  maxAmount: number;
  createdAt: string;
  updatedAt: string;
  items: ComplementItemProp[];
}
