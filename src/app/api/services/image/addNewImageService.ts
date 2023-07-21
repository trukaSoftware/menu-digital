import { uploadImages } from '@/app/utils/uploadImages';
import { ImageData } from '@/app/utils/validations/imageDataValidation';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const addNewImageService = async ({ id, images }: ImageData) => {
  try {
    const productImages = await prisma.productImages.findFirst({
      where: { productId: id },
    });

    if (!productImages) throw new Error(`Tabela buscada não existe`);

    const products = await prisma.products.findUnique({ where: { id } });

    if (!products) throw new Error(`Esse produto não existe`);

    const imagesUrls = (
      (await uploadImages(images, products.name)) || null
    )?.map((image) => ({ ...image, productId: products.id }));

    return prisma.productImages.createMany({
      data: imagesUrls,
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
