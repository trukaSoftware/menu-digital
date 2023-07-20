import { NextResponse } from 'next/server';

import { EditProductData } from '@/app/utils/types';

import { editProductService } from '../../services/product/editProductService';

export async function PUT(req: Request) {
  const {
    id,
    name,
    price,
    description,
    categoryId,
    complementsId,
    complementsToRemove,
  } = (await req.json()) as EditProductData;

  try {
    if (!id)
      throw new Error(
        `Por favor, informe o id do produto para fazer alterações`
      );

    if (
      !name &&
      !price &&
      !description &&
      !categoryId &&
      !complementsId &&
      !complementsToRemove
    )
      throw new Error(
        `Por favor, informe ao menos um campo do produto a ser alterado`
      );

    const productData = await editProductService({
      id,
      name,
      price,
      description,
      categoryId,
      complementsId,
      complementsToRemove,
    });

    return NextResponse.json({ productData });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
