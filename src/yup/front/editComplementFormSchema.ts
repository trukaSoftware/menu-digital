import * as Yup from 'yup';

const complementValidation = Yup.string().required(
  `É preciso preencher este campo com o nome da adicional.`
);

const itemsIdsValidation = Yup.array().of(Yup.string());

export const editComplementFormSchema = Yup.object().shape({
  complementName: complementValidation,
  itemsIds: itemsIdsValidation,
});
