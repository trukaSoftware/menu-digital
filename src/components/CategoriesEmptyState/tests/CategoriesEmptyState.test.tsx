import axios from 'axios';
import { vi } from 'vitest';

import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
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

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe(`CategoriesEmptyState`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`should open create category modal when clicking on button "Cadastrar categoria"`, async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: { deleted: false } });

    renderWithRedux(<CategoriesEmptyState />);

    const emptyStateNewCategoryBtn = screen.getByRole(`button`, {
      name: `Cadastrar categoria`,
    });

    await userEvent.click(emptyStateNewCategoryBtn);

    expect(
      screen.getByRole(`heading`, { name: `Criação de categoria`, level: 2 })
    ).toBeInTheDocument();
  });
});
