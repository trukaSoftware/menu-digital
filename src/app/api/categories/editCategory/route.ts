import { NextResponse } from 'next/server';

import { EditCategoryData } from '@/utils/types';

import { editCategoryService } from '../../services/category/editCategoryService';

export async function PUT(req: Request) {
  const { id, name } = (await req.json()) as EditCategoryData;

  try {
    if (!id)
      throw new Error(`Por favor, informe o id do item para fazer alterações`);

    if (!name) throw new Error(`Por favor, informe o novo nome da categoria`);

    const categoryData = await editCategoryService({
      id,
      name,
    });

    return NextResponse.json({ categoryData });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
