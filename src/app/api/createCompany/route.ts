import { NextResponse } from 'next/server';

import {
  validateCompanyData,
  CompanyData,
} from '../../utils/companyDataValidation';

export async function POST(req: Request) {
  const {
    id,
    name,
    email,
    address,
    zipCode,
    phoneNumber,
    deliveryPhoneNumber,
  } = req.body as unknown as CompanyData;

  try {
    await validateCompanyData({
      id,
      name,
      email,
      address,
      zipCode,
      phoneNumber,
      deliveryPhoneNumber,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
