import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface RemoveManyProductsCategoryServiceProps {
  id: string;
  productsToRemoveId: string[];
}

export const removeManyProductsCategoryService = async ({
  id,
  productsToRemoveId,
}: RemoveManyProductsCategoryServiceProps) => {
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
          in: productsToRemoveId,
        },
      },
      data: {
        productCategoriesId: null,
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
