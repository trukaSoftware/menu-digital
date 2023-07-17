import { NextResponse } from 'next/server';

import { EditComplementsData } from '@/app/utils/types';

import { editComplementService } from '../../services/complement/editComplementService';

export async function PUT(req: Request) {
  const { id, name, maxAmount } = (await req.json()) as EditComplementsData;

  try {
    if (!id)
      throw new Error(
        `Por favor, informe o id do complemento para fazer alterações`
      );

    if (!name || !maxAmount)
      throw new Error(
        `Por favor, informe ao menos um campo do complemento a ser alterado`
      );

    const complementData = await editComplementService({
      id,
      name,
      maxAmount,
    });

    return NextResponse.json({ complementData });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}
