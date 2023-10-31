export interface CompanyPayload {
  name: string;
  id: string | undefined;
  email: string | undefined;
  cnpj: string;
  phoneNumber: string;
  deliveryPhoneNumber?: string;
  address: string;
  zipCode: string;
  companyLogo: {
    file: string | undefined;
  };
  companyTheme: {
    file: string | undefined;
  };
  deliveryTax: number;
  deliveryTime: string;
  openingHours: string;
  instagramUrl: string;
}

export interface CreateCompanyResponse {
  companyId: string;
}
