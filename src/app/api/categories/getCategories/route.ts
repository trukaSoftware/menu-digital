import { NextResponse } from 'next/server';

import { getCategoriesService } from '../../services/category/getCategoriesService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get(`id`);

  try {
    if (!companyId)
      throw new Error(
        `Por favor, adicione o id do estabelecimento a ser buscado`
      );

    const categories = await getCategoriesService(companyId);

    return NextResponse.json({ categories });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
