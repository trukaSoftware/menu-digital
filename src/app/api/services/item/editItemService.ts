import { EditItemData } from '@/utils/types';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const editItemService = async ({ id, name, price }: EditItemData) => {
  try {
    const existingRegister = await prisma.items.findUnique({
      where: {
        id,
      },
    });

    if (!existingRegister) {
      throw new Error(`Registro não encontrado para o ID: ${id}`);
    }

    const updatedData = await prisma.items.update({
      where: { id },
      data: {
        name: name || existingRegister.name,
        price: price || existingRegister.price,
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
