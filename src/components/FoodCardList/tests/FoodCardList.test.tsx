import { vi } from 'vitest';

import { render, screen, cleanup } from '@testing-library/react';

import FoodCardList, { FoodCardListProps } from '..';

describe(`FoodCardList`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockProps = {
    title: `Mais vendido`,
    foodCards: [],
  } as FoodCardListProps;

  it(`check if h2 is beeing rendered`, () => {
    render(<FoodCardList {...mockProps} />);

    const heading = screen.getByRole(`heading`, {
      name: `Mais vendido`,
      level: 2,
    });

    expect(heading).toBeVisible();
  });
});
