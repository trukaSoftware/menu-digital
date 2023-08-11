import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCategoriesService = async (companyId: string) => {
  try {
    const categories = await prisma.productCategories.findMany({
      where: { companyId },
      select: {
        id: true,
        name: true,
        product: {
          where: { companyId },
          include: {
            productsImages: true,
            productsComplements: {
              include: {
                complements: {
                  include: {
                    items: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const tratedCategories = categories.map((category) => ({
      ...category,
      categoryProducts: category.product,
      product: undefined,
    }));

    return tratedCategories;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
