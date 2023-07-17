import { NextResponse } from 'next/server';

import { deleteCompanyService } from '../../services/company/deleteCompanyService';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id)
      throw new Error(
        `Por favor, adicione o id do estabelecimento a ser deletado`
      );

    await deleteCompanyService(id);

    return NextResponse.json({ deleted: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    throw error;
  }
}
