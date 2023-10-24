export interface ItemPayload {
  complementId: string;
  items: Item[];
}

export interface Item {
  name: string;
  price: number;
}

export interface ItemReturn {
  id: string;
  name: string;
  price: number;
  complementId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemResponse {
  item: ItemReturn;
}
