import axios from 'axios';
import { vi } from 'vitest';

import { categoriesMock } from '@/mocks/categories';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProductsEmptyState from '..';

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

describe(`ProductsEmptyState`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`should open create product modal when clicking on button "Cadastrar produto"`, async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { categories: categoriesMock },
    });

    renderWithRedux(<ProductsEmptyState />);

    const emptyStateNewProductBtn = screen.getByRole(`button`, {
      name: `Cadastrar produto`,
    });

    await userEvent.click(emptyStateNewProductBtn);

    expect(
      screen.getByRole(`heading`, { name: `Criação de produto`, level: 2 })
    ).toBeInTheDocument();
  });
});
