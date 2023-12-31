import { vi } from 'vitest';

import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import Badges, { BadgesProps } from '..';

const mockProps = {
  badges: [`Mais vendidos`, `Caldos`, `Bebidas`, `Espetinhos`, `aiphone`],
} as BadgesProps;

describe(`Badge`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`When clicking on a link should gain the class selected`, async () => {
    render(<Badges {...mockProps} />);

    const foodLink = screen.getByText(`Caldos`);

    expect(foodLink).toBeInTheDocument();
    expect(foodLink).not.toHaveClass(`selected`);

    fireEvent.click(foodLink);

    expect(await screen.findByText(`Caldos`)).toHaveClass(`selected`);
  });

  it(`Should only have one selected link at time`, async () => {
    render(<Badges {...mockProps} />);

    fireEvent.click(screen.getByText(`Caldos`));

    expect(screen.getByText(`Bebidas`)).not.toHaveClass(`selected`);
    expect(await screen.findByText(`Caldos`)).toHaveClass(`selected`);

    fireEvent.click(screen.getByText(`Bebidas`));

    expect(await screen.findByText(`Bebidas`)).toHaveClass(`selected`);
    expect(screen.getByText(`Caldos`)).not.toHaveClass(`selected`);
  });
});
