import { vi } from 'vitest';

import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import Badges, { BadgesProps } from '..';

import { mockBadges } from '../../Header';

const mockProps = {
  badges: mockBadges,
} as BadgesProps;

describe(`Badge`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  test(`When clicking on a link he should gain the class selected`, async () => {
    render(<Badges {...mockProps} />);

    const foodLink = screen.getByText(`Caldos`);

    expect(foodLink).toBeInTheDocument();
    expect(foodLink).not.toHaveClass(`selected`);

    fireEvent.click(foodLink);

    expect(await screen.findByText(`Caldos`)).toHaveClass(`selected`);
  });

  test(`Should only have one selected link at time`, async () => {
    render(<Badges {...mockProps} />);

    fireEvent.click(screen.getByText(`Caldos`));

    expect(screen.getByText(`Bebidas`)).not.toHaveClass(`selected`);
    expect(await screen.findByText(`Caldos`)).toHaveClass(`selected`);

    fireEvent.click(screen.getByText(`Bebidas`));

    expect(await screen.findByText(`Bebidas`)).toHaveClass(`selected`);
    expect(screen.getByText(`Caldos`)).not.toHaveClass(`selected`);
  });
});
