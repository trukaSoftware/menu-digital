import { vi } from 'vitest';

import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CategoriesEmptyState from '..';

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({
    user: {
      id: `1`,
    },
  }),
}));

describe(`CategoriesEmptyState`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`should open create category modal when clicking on button "Cadastrar categoria"`, async () => {
    render(<CategoriesEmptyState />);

    const emptyStateNewCategoryBtn = screen.getByRole(`button`, {
      name: `Cadastrar categoria`,
    });

    expect(emptyStateNewCategoryBtn).toBeInTheDocument();

    await userEvent.click(emptyStateNewCategoryBtn);

    expect(
      screen.getByRole(`heading`, { name: `Criação de categoria`, level: 2 })
    ).toBeInTheDocument();
  });
});
