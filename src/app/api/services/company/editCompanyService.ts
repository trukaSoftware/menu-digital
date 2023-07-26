import { createSlug } from '@/app/utils/createSlug';
import { EditCompanyData } from '@/app/utils/types';
import { updateUserMetadata } from '@/app/utils/updateUserMetadata';
import { uploadImages } from '@/app/utils/uploadImages';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const editCompanyService = async ({
  id,
  company,
  companyInfo,
  companyAddress,
}: EditCompanyData) => {
  try {
    const existingRegister = await prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        info: true,
      },
    });

    if (!existingRegister) {
      throw new Error(`Registro não encontrado para o ID: ${id}`);
    }

    const infoId = existingRegister.info?.id;

    if (company) {
      await prisma.company.update({
        where: {
          id,
        },
        data: {
          name: company.name || existingRegister.name,
          slug:
            company.slug || createSlug(company.name || existingRegister.name),
          status: company.status || existingRegister.status,
        },
      });
    }

    if (companyInfo) {
      const { companyLogo, companyTheme } = companyInfo;

      const companyImages =
        companyLogo && companyTheme ? [companyLogo, companyTheme] : null;

      let imagesUrls = [] as {
        name: string | undefined;
        alt: string | undefined;
        imageUrl: string;
      }[];

      if (companyImages) {
        imagesUrls = await uploadImages(
          companyImages,
          existingRegister.name,
          `companies`
        );
      }

      const existingInfo = await prisma.info.findUnique({
        where: {
          id: infoId,
        },
      });

      if (!existingInfo) {
        throw new Error(`Registro não encontrado para o ID: ${infoId}`);
      }

      await prisma.info.update({
        where: {
          id: infoId,
        },
        data: {
          email: companyInfo.email || existingInfo.email,
          cnpj: companyInfo.cnpj || existingInfo.cnpj,
          phoneNumber: companyInfo.phoneNumber || existingInfo.phoneNumber,
          deliveryPhoneNumber:
            companyInfo.deliveryPhoneNumber || existingInfo.deliveryPhoneNumber,
          companyLogoUrl: imagesUrls[0].imageUrl || existingInfo.companyLogoUrl,
          companyThemeUrl:
            imagesUrls[1].imageUrl || existingInfo.companyThemeUrl,
        },
      });
    }

    if (companyAddress) {
      const existingInfo = await prisma.address.findUnique({
        where: {
          infoId,
        },
      });

      if (!existingInfo) {
        throw new Error(`Registro não encontrado para o ID: ${infoId}`);
      }

      await prisma.address.update({
        where: {
          infoId,
        },
        data: {
          zipCode: companyAddress.zipCode || existingInfo.zipCode,
          address: companyAddress.address || existingInfo.address,
        },
      });
    }

    const updatedData = await prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        info: {
          include: {
            address: true,
          },
        },
      },
    });

    await updateUserMetadata({
      id,
      publicMetadata: { slug: `${company?.slug}` },
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
