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
  };
  companyAddress?: {
    zipCode?: string;
    address?: string;
  };
};
