import { NextResponse } from 'next/server';

import { getProductByIdService } from '../../services/product/getProductByIdService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id) throw new Error(`Por favor, adicione o id a ser buscado`);

    const product = await getProductByIdService(id);

    return NextResponse.json({ product });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
