export interface ComplementPayload {
  name: string;
  maxAmount: number;
  required: boolean;
}

// export interface ComplementReturn {
//   complementId: string;
// }

export interface ComplementResponse {
  complementId: string;
}

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
