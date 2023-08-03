export const formatPhoneNumber = (phoneNumber: string) => {
  const ddd = phoneNumber.substring(0, 2);
  if (phoneNumber.length === 11) {
    const part1 = phoneNumber.substring(2, 7);
    const part2 = phoneNumber.substring(7, 11);
    return `(${ddd}) ${part1}-${part2}`;
  }
  const part1 = phoneNumber.substring(2, 6);
  const part2 = phoneNumber.substring(6, 10);
  return `(${ddd}) ${part1}-${part2}`;
};

export const formatZipCode = (zipcode: string) => {
  const part1 = zipcode.substring(0, 5);
  const part2 = zipcode.substring(5, 8);
  return `${part1}-${part2}`;
};

export const formatCnpj = (cnpj: string) => {
  const part1 = cnpj.substring(0, 2);
  const part2 = cnpj.substring(2, 5);
  const part3 = cnpj.substring(5, 8);
  const part4 = cnpj.substring(8, 12);
  const part5 = cnpj.substring(12, 14);
  return `${part1}.${part2}.${part3}/${part4}-${part5}`;
};

export const formatCpf = (cpf: string) => {
  const part1 = cpf.substring(0, 3);
  const part2 = cpf.substring(3, 6);
  const part3 = cpf.substring(6, 9);
  const part4 = cpf.substring(9);
  return `${part1}.${part2}.${part3}-${part4}`;
};
