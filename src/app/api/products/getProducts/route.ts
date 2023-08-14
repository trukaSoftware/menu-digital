import { NextResponse } from 'next/server';

import { getProductsService } from '../../services/product/getProductsService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get(`id`);

  try {
    if (!companyId)
      throw new Error(
        `Por favor, adicione o id do estabelecimento a ser buscado`
      );

    const products = await getProductsService(companyId);

    return NextResponse.json({ products });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
