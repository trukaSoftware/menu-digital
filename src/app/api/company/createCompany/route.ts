import { NextResponse } from 'next/server';

import {
  CompanyData,
  validateCompanyData,
} from '@yup/back/companyDataValidation';

import { createCompanyService } from '../../services/company/createCompanyService';

export async function POST(req: Request) {
  const {
    id,
    name,
    email,
    cnpj,
    address,
    zipCode,
    companyLogo,
    companyTheme,
    phoneNumber,
    deliveryPhoneNumber,
    deliveryTax,
    deliveryTime,
    openingHours,
    instagramUrl,
  } = (await req.json()) as CompanyData;

  try {
    await validateCompanyData({
      id,
      name,
      email,
      cnpj,
      address,
      zipCode,
      companyLogo,
      companyTheme,
      phoneNumber,
      deliveryPhoneNumber,
      deliveryTax,
      deliveryTime,
      openingHours,
      instagramUrl,
    });

    const companyId = await createCompanyService({
      id,
      name,
      email,
      cnpj,
      address,
      zipCode,
      companyLogo,
      companyTheme,
      phoneNumber,
      deliveryPhoneNumber,
      deliveryTax,
      deliveryTime,
      openingHours,
      instagramUrl,
    });

    return NextResponse.json({ companyId });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
