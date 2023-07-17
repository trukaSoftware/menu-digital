import { NextResponse } from 'next/server';

import { EditItemData } from '@/app/utils/types';

import { editItemService } from '../../services/item/editItemService';

export async function PUT(req: Request) {
  const { id, name, price } = (await req.json()) as EditItemData;

  try {
    if (!id)
      throw new Error(`Por favor, informe o id do item para fazer alterações`);

    if (!name && !price)
      throw new Error(
        `Por favor, informe ao menos um campo do item a ser alterado`
      );

    const itemDate = await editItemService({
      id,
      name,
      price,
    });

    return NextResponse.json({ itemDate });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}