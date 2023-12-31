import { NextResponse } from 'next/server';

import {
  ComplementData,
  validateComplementData,
} from '@yup/back/complementsDataValidation';

import { createComplementService } from '../../services/complement/createComplementService';

export async function POST(req: Request) {
  const { name, maxAmount, required, companyId } =
    (await req.json()) as ComplementData;

  try {
    await validateComplementData({
      name,
      maxAmount,
      required,
      companyId,
    });

    const complementId = await createComplementService({
      name,
      maxAmount,
      required,
      companyId,
    });

    return NextResponse.json({ complementId });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
