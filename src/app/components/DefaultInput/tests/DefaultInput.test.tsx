import { UseFormRegisterReturn } from 'react-hook-form';

import { vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import DefaultInput from '..';

describe(`DefaultInput`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockRegister = {} as UseFormRegisterReturn;

  it(`should render the input element with the correct type`, () => {
    render(
      <DefaultInput
        Icon={<span>Icon</span>}
        name="name"
        placeholder="Hamburguer"
        type="text"
        register={mockRegister}
        error={undefined}
      />
    );
    const inputElement = screen.getByPlaceholderText(
      `Hamburguer`
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe(`text`);
  });

  it(`should render the Icon`, () => {
    render(
      <DefaultInput
        Icon={<span data-testid="mock-icon">Icon</span>}
        name="name"
        register={mockRegister}
        error={undefined}
      />
    );
    const iconElement = screen.getByTestId(`mock-icon`);
    expect(iconElement).toBeInTheDocument();
  });

  it(`should render the label text if provided`, () => {
    const labelText = `This is the label`;
    render(
      <DefaultInput
        Icon={<span data-testid="mock-icon">Icon</span>}
        name="input-name"
        labelText={labelText}
        register={mockRegister}
        error={undefined}
      />
    );
    const labelElement = screen.getByText(labelText);
    expect(labelElement).toBeInTheDocument();
  });

  it(`should render the error message if error prop is provided`, () => {
    const errorMessage = `This is an error message`;
    render(
      <DefaultInput
        Icon={<span data-testid="mock-icon">Icon</span>}
        name="input-name"
        register={mockRegister}
        error={errorMessage}
      />
    );
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
