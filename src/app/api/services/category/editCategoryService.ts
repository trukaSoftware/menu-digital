import { EditCategoryData } from '@/app/utils/types';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const editCategoryService = async ({ id, name }: EditCategoryData) => {
  try {
    const existingRegister = await prisma.productCategories.findUnique({
      where: {
        id,
      },
    });

    if (!existingRegister) {
      throw new Error(`Registro não encontrado para o ID: ${id}`);
    }

    const nameAlreadyRegistered = await prisma.productCategories.findFirst({
      where: { name },
    });

    if (nameAlreadyRegistered)
      throw new Error(
        `${name} já é o nome de uma categória existente, escolha outro nome`
      );

    const updatedData = await prisma.productCategories.update({
      where: { id },
      data: {
        name,
      },
    });

    return updatedData;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
