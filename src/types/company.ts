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
}

export interface CreateCompanyResponse {
  companyId: string;
}
