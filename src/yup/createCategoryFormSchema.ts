import * as Yup from 'yup';

const nameValidation = Yup.string().required(
  `É preciso preencher o campo nome.`
);

const productsIdsValidation = Yup.array().of(Yup.string());

export const createCategoryFormSchema = Yup.object().shape({
  name: nameValidation,
  productsIds: productsIdsValidation,
});
