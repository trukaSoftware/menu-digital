import { CategoryReturn, GetCategoryReturn } from '@/types/category';

export const categories = [
  {
    id: `123`,
    name: `Caldinho`,
    categoryProducts: [
      {
        id: `1b333aab-dc14-40bf-a94b-81be34684512`,
        name: `Pizza`,
        description: `Rasga tudo mas é bão`,
        price: `12`,
        discount: null,
        companyId: `user_2TAnaTdaUI6K5SKHTrwKmv5EsGF`,
        productCategoriesId: `251ff66e-e283-4658-8acb-e0b69a4f6562`,
        createdAt: `2023-08-15T21:16:11.986Z`,
        updatedAt: `2023-08-15T21:16:11.986Z`,
        productsImages: [
          {
            id: `5bf6ffcd-55e4-48fb-855b-ab0c0c8f1458`,
            name: `Truka Software Logo`,
            imageUrl: `https://res.cloudinary.com/doi97paso/image/upload/v1692134181/products/Pizza-0-1692134171993.png`,
            alt: `Logo da Truka Software`,
            productId: `1b333aab-dc14-40bf-a94b-81be34684512`,
            createdAt: `2023-08-15T21:16:13.417Z`,
            updatedAt: `2023-08-15T21:16:13.417Z`,
          },
        ],
        productsComplements: [
          {
            productsId: `1b333aab-dc14-40bf-a94b-81be34684512`,
            complementId: `ac31eb3d-55ee-4539-9343-71e9c67340a8`,
            complements: {
              id: `ac31eb3d-55ee-4539-9343-71e9c67340a8`,
              name: `Borda`,
              maxAmount: 3,
              createdAt: `2023-07-31T23:19:33.695Z`,
              updatedAt: `2023-07-31T23:19:33.695Z`,
              items: [],
            },
          },
        ],
      },
    ],
  },
] as unknown as GetCategoryReturn;
