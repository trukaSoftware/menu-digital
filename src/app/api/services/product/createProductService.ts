import { uploadImages } from '@/app/utils/uploadImages';
import { ProductData } from '@/app/utils/validations/productDataValidation';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const createProductService = async ({
  name,
  description,
  price,
  categoryId,
  companyId,
  complementId,
  discount,
  images,
}: ProductData) => {
  try {
    const productExists = await prisma.products.findFirst({
      where: { name },
    });

    if (productExists) throw new Error(`Produto já existe`);

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price,
        ProductCategoriesId: categoryId,
        companyId,
        discount,
      },
    });

    if (complementId) {
      await prisma.productsComplements.create({
        data: {
          complementId,
          productsId: product.id,
        },
      });
    }

    const imagesUrls = (images ? await uploadImages(images) : null)?.map(
      (image) => ({ ...image, productId: product.id })
    );

    if (imagesUrls) {
      await prisma.productImages.createMany({
        data: imagesUrls,
      });
    }

    return prisma.products.findUnique({
      where: { id: product.id },
      include: {
        productsImages: true,
        complements: {
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
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
