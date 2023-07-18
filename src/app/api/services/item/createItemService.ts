import { ItemData } from '@/app/utils/validations/itemDataValidation';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const createItemService = async ({
  complementId,
  name,
  price,
}: ItemData) => {
  try {
    const itemExists = await prisma.items.findFirst({
      where: { complementId },
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }

    throw error;
  }
};
