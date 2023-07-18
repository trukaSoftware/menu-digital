import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const deleteItemService = async (id: string) => {
  try {
    return prisma.items.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }

    throw error;
  }
};
