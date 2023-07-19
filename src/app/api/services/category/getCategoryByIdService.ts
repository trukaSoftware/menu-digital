import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCategoryByIdService = async (id: string) => {
  try {
    const category = await prisma.productCategories.findUnique({
      where: { id },
    });

    return category;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
