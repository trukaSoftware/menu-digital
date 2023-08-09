/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React from 'react';
import {
  ControllerRenderProps,
  FieldError,
  RefCallBack,
} from 'react-hook-form';

import { vi } from 'vitest';

import { render, cleanup, screen, fireEvent } from '@testing-library/react';

import DefaultSelect from '..';

vi.mock(`@/hooks/useCategories`, () => ({
  useCategories: () => ({
    categories: [
      { id: `1`, name: `Caldinhos` },
      { id: `2`, name: `Bebidas` },
    ],
    gettingCategories: false,
  }),
}));

vi.mock(`@radix-ui/react-select`, () => ({
  Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Trigger: ({ children }: { children: React.ReactNode }) => (
    <div role="combobox">{children}</div>
  ),
  Value: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Viewport: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Group: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Label: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Item: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ItemText: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ItemIndicator: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe(`DefaultSelect`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockField: ControllerRenderProps<any, 'categoryId'> = {
    onChange: vi.fn(),
    onBlur: vi.fn(),
    value: ``,
    name: `categoryId`,
    ref: null as unknown as RefCallBack,
  };

  it(`should render the component with categories`, async () => {
    const mockError: FieldError | undefined = undefined;

    render(<DefaultSelect field={mockField} error={mockError} />);

    const productSelectInput = screen.getByRole(`combobox`);

    fireEvent.click(productSelectInput);

    const option1 = await screen.findByText(`Caldinhos`);
    const option2 = await screen.findByText(`Bebidas`);

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it(`if error, should render the component with error message`, () => {
    const mockError: FieldError = {
      type: `required`,
      message: `This field is required`,
    };

    render(<DefaultSelect field={mockField} error={mockError} />);

    const errorMessageElement = screen.getByText(`This field is required`);

    expect(errorMessageElement).toBeInTheDocument();
  });
});
