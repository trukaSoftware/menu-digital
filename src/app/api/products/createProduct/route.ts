import { NextResponse } from 'next/server';

import {
  ProductData,
  validateProductData,
} from '@yup/back/productDataValidation';

import { createProductService } from '../../services/product/createProductService';

export async function POST(req: Request) {
  const {
    name,
    description,
    price,
    categoryId,
    companyId,
    complementsId,
    discount,
    images,
  } = (await req.json()) as ProductData;

  try {
    await validateProductData({
      name,
      description,
      price,
      categoryId,
      companyId,
      complementsId,
      discount,
      images,
    });

    const product = await createProductService({
      name,
      description,
      price,
      categoryId,
      companyId,
      complementsId,
      discount,
      images,
    });

    return NextResponse.json({ product });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
