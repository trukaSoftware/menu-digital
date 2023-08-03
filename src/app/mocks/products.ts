import { Product, ProductsImage } from '@/types/product';

export const complementsMock = {
  id: `ac31eb3d-55ee-4539-9343-71e9c67340a8`,
  name: `Borda`,
  maxAmount: 3,
  createdAt: `2023-07-31T23:19:33.695Z`,
  updatedAt: `2023-07-31T23:19:33.695Z`,
  items: [],
};

export const productsComplementMock = {
  productsId: `74fcf000-9fb5-4a45-b63c-71d3663e48ac`,
  complementId: `ac31eb3d-55ee-4539-9343-71e9c67340a8`,
  complements: complementsMock,
};

export const productsComplementsMock = [productsComplementMock];

export const productImageMock = {
  id: `25999687-c308-4576-bd7b-8f9c3fbba55c`,
  name: `Truka Software Logo`,
  imageUrl: `https://res.cloudinary.com/doi97paso/image/upload/v1690999717/products/P%C3%A3o-0-1690999715664.png`,
  alt: `Logo da Truka Software`,
  productId: `74fcf000-9fb5-4a45-b63c-71d3663e48ac`,
  createdAt: `2023-08-02T18:08:37.259Z`,
  updatedAt: `2023-08-02T18:08:37.259Z`,
};

export const productsImagesMock = [productImageMock] as ProductsImage[];

export const productMock = {
  id: `74fcf000-9fb5-4a45-b63c-71d3663e48ac`,
  name: `Pão`,
  description: `Rasga tudo mas é bão`,
  price: `12`,
  discount: null,
  companyId: `user_2TAnaTdaUI6K5SKHTrwKmv5EsGF`,
  productCategoriesId: `810640e3-a1ec-414b-ad14-deb1dd3f2989`,
  createdAt: `2023-08-02T18:08:35.658Z`,
  updatedAt: `2023-08-02T18:08:35.658Z`,
  productsImages: productsImagesMock,
  productsComplements: productsComplementsMock,
};

export const productsMocks = [
  productMock,
  [
    {
      id: `e51e161b-8628-466d-934b-0d5b698236b4`,
      name: `Guaraná Antartica`,
      description: `Rasga tudo mas é bão`,
      price: `12`,
      discount: null,
      companyId: `user_2TAnaTdaUI6K5SKHTrwKmv5EsGF`,
      productCategoriesId: `810640e3-a1ec-414b-ad14-deb1dd3f2989`,
      createdAt: `2023-08-02T18:08:58.591Z`,
      updatedAt: `2023-08-02T18:08:58.591Z`,
      productsImages: [
        {
          id: `f6a6a8dc-41e0-4c1e-9515-ab84cbb7b0bb`,
          name: `Truka Software Logo`,
          imageUrl: `https://res.cloudinary.com/doi97paso/image/upload/v1690999740/products/Guaran%C3%A1%20Antartica-0-1690999738595.png`,
          alt: `Logo da Truka Software`,
          productId: `e51e161b-8628-466d-934b-0d5b698236b4`,
          createdAt: `2023-08-02T18:08:59.880Z`,
          updatedAt: `2023-08-02T18:08:59.880Z`,
        },
      ],
      productsComplements: [
        {
          productsId: `e51e161b-8628-466d-934b-0d5b698236b4`,
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
    {
      id: `bb7209c1-aaa8-4327-ae83-409fa786acdb`,
      name: `Guaraná Jesus`,
      description: `Rasga tudo mas é bão`,
      price: `12`,
      discount: null,
      companyId: `user_2TAnaTdaUI6K5SKHTrwKmv5EsGF`,
      productCategoriesId: `810640e3-a1ec-414b-ad14-deb1dd3f2989`,
      createdAt: `2023-08-02T18:09:05.888Z`,
      updatedAt: `2023-08-02T18:09:05.888Z`,
      productsImages: [
        {
          id: `1355b768-a465-4b22-ab4d-fc800468980a`,
          name: `Truka Software Logo`,
          imageUrl: `https://res.cloudinary.com/doi97paso/image/upload/v1690999747/products/Guaran%C3%A1%20Jesus-0-1690999745894.png`,
          alt: `Logo da Truka Software`,
          productId: `bb7209c1-aaa8-4327-ae83-409fa786acdb`,
          createdAt: `2023-08-02T18:09:07.728Z`,
          updatedAt: `2023-08-02T18:09:07.728Z`,
        },
      ],
      productsComplements: [
        {
          productsId: `bb7209c1-aaa8-4327-ae83-409fa786acdb`,
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
    {
      id: `bc17acd4-fe1d-46ed-8a02-7d212c6f56f9`,
      name: `Smash burguer`,
      description: `Rasga tudo mas é bão`,
      price: `12`,
      discount: null,
      companyId: `user_2TAnaTdaUI6K5SKHTrwKmv5EsGF`,
      productCategoriesId: `810640e3-a1ec-414b-ad14-deb1dd3f2989`,
      createdAt: `2023-08-02T18:09:27.260Z`,
      updatedAt: `2023-08-02T18:09:27.260Z`,
      productsImages: [
        {
          id: `c35f46ce-9038-41ed-98b2-725fdf1c8fc1`,
          name: `Truka Software Logo`,
          imageUrl: `https://res.cloudinary.com/doi97paso/image/upload/v1690999769/products/Smash%20burguer-0-1690999767267.png`,
          alt: `Logo da Truka Software`,
          productId: `bc17acd4-fe1d-46ed-8a02-7d212c6f56f9`,
          createdAt: `2023-08-02T18:09:28.506Z`,
          updatedAt: `2023-08-02T18:09:28.506Z`,
        },
      ],
      productsComplements: [
        {
          productsId: `bc17acd4-fe1d-46ed-8a02-7d212c6f56f9`,
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
] as Product[];
