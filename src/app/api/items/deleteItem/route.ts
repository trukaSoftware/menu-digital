import { NextResponse } from 'next/server';

import { deleteItemService } from '../../services/item/deleteItemService';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id) throw new Error(`Por favor, adicione o id do item a ser deletado`);

    await deleteItemService(id);

    return NextResponse.json({ deleted: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    throw error;
  }
}
