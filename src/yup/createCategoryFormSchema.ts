import * as Yup from 'yup';

const nameValidation = Yup.string().required(
  `É preciso preencher este campo com o nome da categoria.`
);

const productsIdsValidation = Yup.array().of(Yup.string());

export const createCategoryFormSchema = Yup.object().shape({
  categoryName: nameValidation,
  productsIds: productsIdsValidation,
});
