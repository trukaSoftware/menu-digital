import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCategoriesService = async () => {
  try {
    const categories = await prisma.productCategories.findMany();

    return categories;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
