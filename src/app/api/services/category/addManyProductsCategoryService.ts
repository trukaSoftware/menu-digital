import { EditManyProductsCategoryData } from '@/utils/types';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const addManyProductsCategoryService = async ({
  id,
  productsToAddId,
}: Omit<EditManyProductsCategoryData, 'productsToRemoveId'>) => {
  try {
    const existingRegister = await prisma.productCategories.findUnique({
      where: {
        id,
      },
    });

    if (!existingRegister) {
      throw new Error(`Registro não encontrado para o ID: ${id}`);
    }

    return prisma.products.updateMany({
      where: {
        id: {
          in: productsToAddId,
        },
      },
      data: {
        productCategoriesId: id,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
