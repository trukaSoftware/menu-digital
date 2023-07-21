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
