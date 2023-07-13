export const createSlug = (text: string) => {
  let result = text.toLowerCase();

  result = result.replace(/\s/g, `-`);
  result = result.normalize(`NFD`).replace(/[\u0300-\u036f]/g, ``);
  result = result.replace(/[^a-z0-9-]/g, ``);
  result = result.replace(/-+/g, `-`);

  return result;
};
