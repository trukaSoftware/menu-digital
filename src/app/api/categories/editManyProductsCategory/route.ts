import { NextResponse } from 'next/server';

import { EditManyProductsCategoryData } from '@/utils/types';

import { addManyProductsCategoryService } from '../../services/category/addManyProductsCategoryService';
import { getCategoriesService } from '../../services/category/getCategoriesService';
import { removeManyProductsCategoryService } from '../../services/category/removeManyProductsCategoryService';

export async function PUT(req: Request) {
  const { id, productsToAddId, productsToRemoveId } =
    (await req.json()) as EditManyProductsCategoryData;
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get(`companyId`);

  try {
    if (!companyId)
      throw new Error(
        `Por favor, informe o id do estabelecimento para fazer alterações`
      );

    if (!id)
      throw new Error(
        `Por favor, informe o id da categoria para fazer alterações`
      );

    if (productsToAddId.length === 0 && productsToRemoveId.length === 0)
      throw new Error(
        `Por favor, informe os produtos que deseja adicionar ou remover da categoria`
      );

    if (productsToAddId.length > 0) {
      await addManyProductsCategoryService({ id, productsToAddId });
    }

    if (productsToRemoveId.length > 0) {
      await removeManyProductsCategoryService({ id, productsToRemoveId });
    }

    const updatedCategories = await getCategoriesService(companyId);

    return NextResponse.json({ updatedCategories });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
