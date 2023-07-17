import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getItemByIdService = async (id: string) => {
  try {
    const item = await prisma.items.findUnique({
      where: { id },
    });

    return item;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }

    throw error;
  }
};
