import { EditItemData } from '@/utils/types';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const editItemService = async ({
  id,
  name,
  price,
  complementId,
}: EditItemData) => {
  try {
    const existingRegister = await prisma.items.findUnique({
      where: {
        id,
      },
    });

    if (!existingRegister) {
      throw new Error(`Registro não encontrado para o ID: ${id}`);
    }

    if (complementId === null) {
      return prisma.items.update({
        where: { id },
        data: {
          name: name || existingRegister.name,
          price: price || existingRegister.price,
          complementId: null,
        },
      });
    }

    const updatedData = await prisma.items.update({
      where: { id },
      data: {
        name: name || existingRegister.name,
        price: price || existingRegister.price,
        complementId: complementId || existingRegister.complementId,
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
