import { vi } from 'vitest';

import { render, screen, cleanup } from '@testing-library/react';

import ButtonSubmit, { ButtonSubmitProps } from '..';

const mockProps = {
  isSubmiting: false,
  submitError: false,
  text: `Mocked text`,
} as ButtonSubmitProps;

describe(`ButtonSubmit`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`when submitError prop is true should only load text "Erro ao enviar, tente novamente."`, () => {
    render(<ButtonSubmit {...mockProps} submitError />);

    expect(
      screen.getByText(`Erro ao enviar, tente novamente.`)
    ).toBeInTheDocument();

    expect(screen.queryByTestId(`spinner`)).not.toBeInTheDocument();
    expect(screen.queryByText(`Mocked text`)).not.toBeInTheDocument();
  });

  it(`when isSubmiting prop is true should only load Spinner`, () => {
    render(<ButtonSubmit {...mockProps} isSubmiting />);

    expect(screen.getByTestId(`spinner`)).toBeInTheDocument();

    expect(
      screen.queryByText(`Erro ao enviar, tente novamente.`)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(`Mocked text`)).not.toBeInTheDocument();
  });

  it(`when isSubmiting and submitError props are false should only load passed text`, () => {
    render(<ButtonSubmit {...mockProps} />);

    expect(screen.queryByText(`Mocked text`)).toBeInTheDocument();

    expect(screen.queryByTestId(`spinner`)).not.toBeInTheDocument();
    expect(
      screen.queryByText(`Erro ao enviar, tente novamente.`)
    ).not.toBeInTheDocument();
  });
});
