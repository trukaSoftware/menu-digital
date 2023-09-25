import { describe, it, vi } from 'vitest';

import { cleanup } from '@testing-library/react';

import { limitNumberOfCharacters } from '../limitNumberOfCharacters';

describe(`limitNumberOfCharacters`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`String less than 108 characters must be returned unchanged`, () => {
    const input = `Lorem ipsum dolor.`;
    const result = limitNumberOfCharacters(input);
    expect(result).toBe(input);
  });

  it(`String with exactly 108 characters must be returned unchanged`, () => {
    const input = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea distinctio consequuntur consequatur repudiandae.`;
    const result = limitNumberOfCharacters(input);
    expect(result).toBe(input);
  });

  it(`String longer than 108 characters must be truncated with "..." at the end`, () => {
    const input = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea distinctio consequuntur consequatur repudiandae test.`;
    const result = limitNumberOfCharacters(input);
    const expected = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea distinctio consequuntur consequatur repudiandae...`;
    expect(result).toBe(expected);
  });
});
