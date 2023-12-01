import { EditItemData } from '@/utils/types';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const editItemService = async ({
  id,
  name,
  price,
  complementId,
  visible,
}: EditItemData) => {
  try {
    const existingRegister = await prisma.items.findUnique({
      where: {
        id,
      },
    });

    const isVisible = !!visible;

    if (!existingRegister) {
      throw new Error(`Registro não encontrado para o ID: ${id}`);
    }

    const itemPrice =
      // eslint-disable-next-line no-nested-ternary
      price === 0
        ? price
        : price !== undefined
        ? price
        : existingRegister.price;

    if (complementId === null) {
      return prisma.items.update({
        where: { id },
        data: {
          name: name || existingRegister.name,
          price: itemPrice,
          complementId: null,
          visible: isVisible,
        },
      });
    }

    const updatedData = await prisma.items.update({
      where: { id },
      data: {
        name: name || existingRegister.name,
        price: itemPrice,
        complementId: complementId || existingRegister.complementId,
        visible: isVisible,
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
