import axios from 'axios';
import { vi } from 'vitest';

import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';

import EditableCategoryTitle, { EditableCategoryTitleProps } from '..';

import userEvent from '@testing-library/user-event';

const mockProps = {
  categoryId: `1`,
  categoryName: `1`,
  removeCategoryFromList: vi.fn(),
} as EditableCategoryTitleProps;

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

describe(`EditableCategoryTitle`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`Should render delete category dialog when clicking in delete category trigger button`, async () => {
    renderWithRedux(<EditableCategoryTitle {...mockProps} />);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();

    const deleteCategoryTriggerButton = screen.getByRole(`button`, {
      name: `Excluir categoria`,
    });

    await userEvent.click(deleteCategoryTriggerButton);

    expect(screen.getByRole(`dialog`)).toBeInTheDocument();
    expect(
      screen.getByText(`Deseja realmente excluir esta categoria?`, {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it(`Should render edit category dialog when clicking in edit category trigger button`, async () => {
    vi.mock(`axios`);
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce({
      data: { products: [], gettingProducts: false },
    });

    renderWithRedux(<EditableCategoryTitle {...mockProps} />);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();

    const deleteCategoryTriggerButton = screen.getByRole(`button`, {
      name: `Editar categoria`,
    });

    await userEvent.click(deleteCategoryTriggerButton);

    expect(screen.getByRole(`dialog`)).toBeInTheDocument();
    expect(screen.getByText(`Edição de categoria`)).toBeInTheDocument();
  });
});
