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
  complementsId,
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
        productCategoriesId: categoryId,
        companyId,
        discount,
      },
    });

    if (complementsId) {
      const productsComplemntsIds = complementsId.map((complementId) => ({
        complementId,
        productsId: product.id,
      }));

      await prisma.productsComplements.createMany({
        data: productsComplemntsIds,
      });
    }

    const imagesUrls = (images ? await uploadImages(images, name) : null)?.map(
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
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
