export interface ItemPayload {
  complementId: string | null;
  items: Item[];
  companyId: string;
}

export interface Item {
  name: string;
  price: number;
}

export interface editItemPayload {
  name: string;
  price: number;
  id: string;
  complementId: string | null;
  visible: boolean;
}

export interface editItemResponse {
  itemData: ItemReturn;
}

export interface ItemReturn {
  id: string;
  name: string;
  price: number;
  visible: boolean;
  complementId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ItemResponse {
  item: ItemReturn;
}

export interface GetItemReturn {
  items: ItemReturn[];
}
