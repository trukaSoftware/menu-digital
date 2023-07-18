import { NextResponse } from 'next/server';

import { EditCompanyData } from '@/app/utils/types';

import { editCompanyService } from '../../services/company/editCompanyService';

export async function PUT(req: Request) {
  const { id, company, companyInfo, companyAddress } =
    (await req.json()) as EditCompanyData;

  try {
    if (!id)
      throw new Error(
        `Por favor, informe o id do estabelecimento para fazer alterações`
      );

    if (!company && !companyInfo && !companyAddress)
      throw new Error(
        `Por favor, informe ao menos um objeto da company a ser alterado`
      );

    const companyData = await editCompanyService({
      id,
      company,
      companyInfo,
      companyAddress,
    });

    return NextResponse.json({ company: companyData });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}
