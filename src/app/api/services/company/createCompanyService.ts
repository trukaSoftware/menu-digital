import { createSlug } from '@/utils/createSlug';
import { updateUserMetadata } from '@/utils/updateUserMetadata';
import { uploadImages } from '@/utils/uploadImages';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { CompanyData } from '@yup/back/companyDataValidation';

export const createCompanyService = async ({
  id,
  name,
  email,
  cnpj,
  address,
  zipCode,
  companyLogo,
  companyTheme,
  phoneNumber,
  deliveryPhoneNumber,
  deliveryTax,
  deliveryTime,
  openingHours,
  instagramUrl,
}: CompanyData) => {
  const companyImages = [companyLogo, companyTheme];

  const imagesUrls = await uploadImages(companyImages, name, `companies`);

  try {
    const company = await prisma.company.create({
      data: {
        id,
        name,
        slug: createSlug(name),
        status: `ACTIVE`,
        info: {
          create: {
            email,
            cnpj,
            phoneNumber,
            companyLogoUrl: imagesUrls[0].imageUrl,
            companyThemeUrl: imagesUrls[1].imageUrl,
            deliveryPhoneNumber: deliveryPhoneNumber || phoneNumber,
            deliveryTax,
            deliveryTime,
            openingHours,
            instagramUrl,
            address: {
              create: {
                address,
                zipCode,
              },
            },
          },
        },
      },
    });

    await updateUserMetadata({ id, publicMetadata: { slug: company.slug } });

    return company.id;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
