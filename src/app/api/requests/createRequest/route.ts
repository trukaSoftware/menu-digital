import { NextResponse } from 'next/server';

import {
  RequestData,
  validateRequestData,
} from '@yup/back/requestDataValidation';

import { createRequestService } from '../../services/request/createRequestService';

export async function POST(req: Request) {
  const { products, companyId, branchId, status, table, totalValue } =
    (await req.json()) as RequestData;

  try {
    await validateRequestData({
      products,
      companyId,
      branchId,
      status,
      table,
      totalValue,
    });

    const request = await createRequestService({
      products,
      companyId,
      branchId,
      status,
      table,
      totalValue,
    });

    return NextResponse.json({ request });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
