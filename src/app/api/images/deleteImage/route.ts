import { NextResponse } from 'next/server';

import { deleteImageService } from '../../services/image/deleteImageService';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id)
      throw new Error(`Por favor, adicione o id da imagem a ser deletado`);

    await deleteImageService(id);

    return NextResponse.json({ deleted: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
