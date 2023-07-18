import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getItemsService = async () => {
  try {
    const items = await prisma.items.findMany();

    return items;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }

    throw error;
  }
};
