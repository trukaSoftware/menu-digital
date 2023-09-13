import { GetCategoryReturn } from '@/types/category';

import { productMock } from './products';

export const categoryMock = {
  id: `810640e3-a1ec-414b-ad14-deb1dd3f2989`,
  name: `Reuniao`,
  categoryProducts: [productMock],
} as GetCategoryReturn;

export const categoriesMock = [
  categoryMock,
  {
    id: `810640e3-a1ec-414b-ad14-deb1dd3f2990`,
    name: `Comida`,
    categoryProducts: [productMock],
  },
] as GetCategoryReturn[];
