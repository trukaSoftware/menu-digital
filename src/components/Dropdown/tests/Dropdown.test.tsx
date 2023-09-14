import { vi } from 'vitest';

import Dropdown from '..';

import { SearchProductsListProps } from '@/components/Forms/CreateCategoryForm/SearchProductsList';

import { categoriesMock } from '@/mocks/categories';
import { productsMock } from '@/mocks/products';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockProps = {
  filteredProducts: productsMock,
  register: {},
  gettingProducts: false,
} as SearchProductsListProps;

describe(`Dropdown`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`Must render 1 dropdown at a time when clicked`, async () => {
    renderWithRedux(<Dropdown {...mockProps} categories={categoriesMock} />);

    const firstCategory = screen.getByRole(`heading`, { name: /reuniao/i });
    const secondCategory = screen.getByRole(`heading`, { name: /comida/i });

    await userEvent.click(firstCategory);

    const firstCategoryProduct = await screen.findAllByText(/pão/i);

    expect(firstCategoryProduct).toHaveLength(1);

    await userEvent.click(secondCategory);

    const secondCategoryProduct = await screen.findAllByText(/pão/i);

    expect(secondCategoryProduct).toHaveLength(1);
  });

  it(`Only shows the product that was searched for`, async () => {
    renderWithRedux(<Dropdown {...mockProps} categories={categoriesMock} />);

    const firstCategory = screen.getByRole(`heading`, { name: /reuniao/i });

    await userEvent.click(firstCategory);

    const searchInput = screen.getAllByPlaceholderText(
      `Pesquisar produto por nome...`
    )[0];

    expect(searchInput).toBeInTheDocument();

    const firstCategoryProduct = await screen.findByText(/pão/i);

    await userEvent.type(searchInput, `smash burguer`);

    const searchedProduct = await screen.findByText(/smash burguer/i);

    expect(firstCategoryProduct).not.toBeInTheDocument();
    expect(searchedProduct).toBeInTheDocument();
  });
});
