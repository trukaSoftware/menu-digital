export const createSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s/g, `-`)
    .normalize(`NFD`)
    .replace(/[\u0300-\u036f]/g, ``)
    .replace(/[^a-z0-9-]/g, ``)
    .replace(/-+/g, `-`);
