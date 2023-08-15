export type EditCompanyData = {
  id: string;
  company?: {
    name?: string;
    slug?: string;
    status?: `ACTIVE` | `INACTIVE`;
  };
  companyInfo?: {
    cnpj?: string;
    email?: string;
    phoneNumber?: string;
    deliveryPhoneNumber?: string;
    companyLogo?: {
      file: string;
      width?: number;
      height?: number;
    };
    companyTheme?: {
      file: string;
      width?: number;
      height?: number;
    };
  };
  companyAddress?: {
    zipCode?: string;
    address?: string;
  };
};

export type EditComplementsData = {
  id: string;
  name?: string;
  maxAmount?: number;
};

export type EditItemData = {
  id: string;
  name?: string;
  price?: number;
};

export type EditCategoryData = {
  id: string;
  name: string;
};

export type EditProductData = {
  id: string;
  name?: string;
  price?: string;
  description?: string;
  categoryId?: string;
  complementsId?: string[];
  complementsToRemove?: string[];
};

export type RouterParams = {
  params: {
    slug: string;
    companyId: string;
  };
};

export interface CompanyProps {
  company: Company;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  info: Info;
}

export interface Info {
  id: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  deliveryPhoneNumber: string;
  companyLogoUrl: string;
  companyThemeUrl: string;
  companyId: string;
  branchId: any;
  createdAt: string;
  updatedAt: string;
  address: Address;
}

export interface Address {
  id: string;
  address: string;
  zipCode: string;
  infoId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageProps {
  file: string;
  name: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CreateCompanyData {
  address: string;
  cnpj: string;
  deliveryPhoneNumber?: string;
  email?: string;
  id?: string;
  name: string;
  phoneNumber: string;
  zipCode: string;
  fileLogo?: string | undefined;
  fileCoverCape?: string | undefined;
}
