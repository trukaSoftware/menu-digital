export interface ComplementPayload {
  name: string;
  maxAmount: number;
  required: boolean;
  companyId: string;
}

export interface editComplementPayload {
  name: string;
  maxAmount: number;
  required: boolean;
  id: string;
}

export interface editComplement {
  id: string;
  name: string;
  required: boolean;
  maxAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface editComplementResponse {
  complementData: editComplement;
}

export interface ComplementResponse {
  complementId: string;
}

export interface GetComplementReturn {
  complements: Complement[];
}

export interface GetComplementByIdReturn {
  complements: Complement;
}

export interface ComplementItemProp {
  id: string;
  name: string;
  price: string;
  visible: boolean;
  complementId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Complement {
  id: string;
  name: string;
  required: boolean;
  maxAmount: number;
  createdAt: string;
  updatedAt: string;
  items: ComplementItemProp[];
  productsComplements?: productsComplementsProps[];
}

export interface productsComplementsProps {
  productsId: string;
  complementId: string;
}
