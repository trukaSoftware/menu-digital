import { EditeProductData } from '@/app/utils/types';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const editProductService = async ({
  id,
  name,
  price,
  description,
  categoryId,
  complementsId,
  complementsToRemove,
}: EditeProductData) => {
  try {
    const existingRegister = await prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (!existingRegister) {
      throw new Error(`Registro não encontrado para o ID: ${id}`);
    }

    if (complementsId) {
      const productsComplemntsIds = complementsId.map((complementId) => ({
        complementId,
        productsId: id,
      }));

      await prisma.productsComplements.createMany({
        data: productsComplemntsIds,
      });
    }

    if (complementsToRemove) {
      await prisma.productsComplements.deleteMany({
        where: {
          AND: {
            complementId: {
              in: complementsToRemove,
            },
            productsId: id,
          },
        },
      });
    }

    const updatedData = await prisma.products.update({
      where: { id },
      data: {
        name: name || existingRegister.name,
        price: price || existingRegister.price,
        description: description || existingRegister.description,
        productCategoriesId: categoryId || existingRegister.productCategoriesId,
      },
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
