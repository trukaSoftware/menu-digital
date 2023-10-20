export interface itemPayload {
  complementId: string;
  name: string;
  price: number;
}

export interface itemReturn {
  id: string;
  name: string;
  price: number;
  complementId: string;
  createdAt: string;
  updatedAt: string;
}

export interface itemResponse {
  item: itemReturn;
}
