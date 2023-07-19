import { NextResponse } from 'next/server';

import { getCategoryByIdService } from '../../services/category/getCategoryByIdService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id) throw new Error(`Por favor, adicione o id a ser buscado`);

    const category = await getCategoryByIdService(id);

    return NextResponse.json({ category });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
