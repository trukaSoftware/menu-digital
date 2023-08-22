import { describe, it } from 'vitest';

import { createSlug } from '../createSlug';

describe(`createSlug`, () => {
  it(`should transform a string with spaces into a slug`, () => {
    const text = `Example of Text With Spaces`;
    const result = createSlug(text);
    expect(result).toBe(`example-of-text-with-spaces`);
  });

  it(`should remove special characters and accents`, () => {
    const text = `Çántãção with spécíãl chãrãctérs`;
    const result = createSlug(text);
    expect(result).toBe(`cantacao-with-special-characters`);
  });

  it(`should remove characters that are not letters, numbers, or hyphens`, () => {
    const text = `Text with @invalid! characters`;
    const result = createSlug(text);
    expect(result).toBe(`text-with-invalid-characters`);
  });

  it(`should remove consecutive multiple hyphens`, () => {
    const text = `Text with --- multiple - hyphens`;
    const result = createSlug(text);
    expect(result).toBe(`text-with-multiple-hyphens`);
  });
});
