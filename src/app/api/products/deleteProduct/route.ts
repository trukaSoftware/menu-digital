import { NextResponse } from 'next/server';

import { deleteProductService } from '../../services/product/deleteProductService';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id)
      throw new Error(`Por favor, adicione o id do produto a ser deletado`);

    await deleteProductService(id);

    return NextResponse.json({ deleted: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
