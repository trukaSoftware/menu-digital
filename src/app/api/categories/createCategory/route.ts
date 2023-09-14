import { NextResponse } from 'next/server';

import {
  CategoryData,
  validateCategoryData,
} from '@yup/back/categoryDataValidation';

import { createCategoryService } from '../../services/category/createCategoryService';

export async function POST(req: Request) {
  const { companyId, name } = (await req.json()) as CategoryData;

  try {
    await validateCategoryData({
      companyId,
      name,
    });

    const category = await createCategoryService({
      companyId,
      name,
    });

    return NextResponse.json({ category });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
