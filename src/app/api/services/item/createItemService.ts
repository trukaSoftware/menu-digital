import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { ItemData } from '@yup/back/itemDataValidation';

export const createItemService = async ({ complementId, itens }: ItemData) => {
  try {
    const createdItens = await prisma.items.createMany({
      data: itens.map((item) => ({ ...item, complementId })),
      skipDuplicates: true,
    });

    return createdItens;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
