import { vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import SearchInput from '..';

describe(`DefaultInput`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`should render the input element with the correct type`, () => {
    render(<SearchInput placeholder="Hamburguer" type="text" />);

    const inputElement = screen.getByPlaceholderText(
      `Hamburguer`
    ) as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe(`text`);
  });

  it(`should render placeholder text if provided`, () => {
    const placeholderText = `This is the placeholder`;
    render(<SearchInput placeholder={placeholderText} />);
    const placeholderElement = screen.getByPlaceholderText(placeholderText);
    expect(placeholderElement).toBeInTheDocument();
  });
});
