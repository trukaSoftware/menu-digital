import { EditComplementsData } from '@/app/utils/types';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const editComplementService = async ({
  id,
  name,
  maxAmount,
}: EditComplementsData) => {
  try {
    const existingRegister = await prisma.complements.findUnique({
      where: {
        id,
      },
    });

    if (!existingRegister) {
      throw new Error(`Registro não encontrado para o ID: ${id}`);
    }

    await prisma.complements.update({
      where: { id },
      data: {
        name: name || existingRegister.name,
        maxAmount: maxAmount || existingRegister.maxAmount,
      },
    });

    const updatedData = await prisma.complements.findUnique({
      where: {
        id,
      },
    });

    return updatedData;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }

    return false;
  }
};
