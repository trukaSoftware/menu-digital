import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { ItemData } from '@yup/back/itemDataValidation';

export const createItemService = async ({
  complementId,
  name,
  price,
}: ItemData) => {
  try {
    const itemExists = await prisma.items.findFirst({
      where: {
        AND: {
          name,
          complementId,
        },
      },
    });

    if (itemExists) throw new Error(`Item já existe`);

    const item = await prisma.items.create({
      data: {
        complementId,
        name,
        price,
      },
    });

    return item;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
