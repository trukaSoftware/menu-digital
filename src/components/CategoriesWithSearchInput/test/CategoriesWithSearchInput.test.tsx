import { vi } from 'vitest';

import { categoriesMock, categoryMock } from '@/mocks/categories';
import { productsMock, productMock } from '@/mocks/products';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CategoriesWithSearchInput from '..';

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({
    user: {
      id: `1`,
      emailAddresses: [
        {
          emailAddress: `test@example.com`,
        },
      ],
    },
  }),
}));

describe(`When CategoriesWithSearchInput is called and`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`does not have categories to display, the message "Não existem categorias cadastradas" should be displayed`, async () => {
    renderWithRedux(<CategoriesWithSearchInput />, {
      preloadedState: {
        categoriesReducer: {
          categories: [],
        },
        productsReducer: {
          products: [],
        },
      },
    });

    const emptyState = await screen.findByText(
      `Não existem categorias cadastradas`
    );

    expect(emptyState).toBeInTheDocument();
  });

  it(`have categories to display, should render all categories of categories array as dropdown buttons`, async () => {
    renderWithRedux(<CategoriesWithSearchInput />);

    const firstCategoryDropdownButton = screen.getByRole(`heading`, {
      name: /reuniao/i,
    });

    const secondCategoryDropdownButton = screen.getByRole(`heading`, {
      name: /comida/i,
    });

    expect(firstCategoryDropdownButton).toBeInTheDocument();
    expect(secondCategoryDropdownButton).toBeInTheDocument();
  });

  it(`have categories to display, the first category dropdown button must have 2 products marked in checkboxes`, async () => {
    renderWithRedux(<CategoriesWithSearchInput />, {
      preloadedState: {
        categoriesReducer: {
          categories: [categoryMock],
        },
        productsReducer: {
          products: [
            productsMock[0],
            productsMock[1],
            productsMock[2],
            productsMock[3],
          ],
        },
      },
    });
    const firstCategoryDropdownButton = screen.getByRole(`heading`, {
      name: /reuniao/i,
    });

    await userEvent.click(firstCategoryDropdownButton);

    const checkBoxes = await screen.findAllByTestId(
      `checkbox-810640e3-a1ec-414b-ad14-deb1dd3f2989`
    );

    expect(checkBoxes).toHaveLength(2);
    checkBoxes.forEach((checkBox) => {
      expect(checkBox).toBeChecked();
    });
  });

  it(`have categories to display, the second category dropdown button must have 2 products marked in checkboxes`, async () => {
    renderWithRedux(<CategoriesWithSearchInput />, {
      preloadedState: {
        categoriesReducer: {
          categories: [categoriesMock[1]],
        },
        productsReducer: {
          products: [
            productsMock[0],
            productsMock[1],
            productsMock[2],
            productsMock[3],
          ],
        },
      },
    });

    const secondCategoryDropdownButton = screen.getByRole(`heading`, {
      name: /comida/i,
    });

    await userEvent.click(secondCategoryDropdownButton);

    const checkBoxes = await screen.findAllByTestId(
      `checkbox-810640e3-a1ec-414b-ad14-deb1dd3f2990`
    );

    expect(checkBoxes).toHaveLength(2);
    checkBoxes.forEach((checkBox) => {
      expect(checkBox).toBeChecked();
    });
  });

  it(`inside the categories dropdowns, only shows the product that was searched for`, async () => {
    renderWithRedux(<CategoriesWithSearchInput />, {
      preloadedState: {
        categoriesReducer: {
          categories: [categoriesMock[1]],
        },
        productsReducer: {
          products: [
            productsMock[0],
            productsMock[1],
            productsMock[2],
            productsMock[3],
          ],
        },
      },
    });

    const firstCategoryDropdownButton = screen.getByRole(`heading`, {
      name: /comida/i,
    });

    await userEvent.click(firstCategoryDropdownButton);

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

  it(`has categories to display, must render 1 dropdown at a time when clicked`, async () => {
    renderWithRedux(<CategoriesWithSearchInput />, {
      preloadedState: {
        categoriesReducer: {
          categories: [categoriesMock[0], categoriesMock[1]],
        },
        productsReducer: {
          products: [productMock],
        },
      },
    });

    const firstCategoryDropdownButton = screen.getByRole(`heading`, {
      name: /reuniao/i,
    });
    const secondCategoryDropdownButton = screen.getByRole(`heading`, {
      name: /comida/i,
    });

    await userEvent.click(firstCategoryDropdownButton);

    const firstCategoryProduct = await screen.findAllByText(/pão/i);

    expect(firstCategoryProduct).toHaveLength(1);

    await userEvent.click(secondCategoryDropdownButton);

    const secondCategoryProduct = await screen.findAllByText(/pão/i);

    expect(secondCategoryProduct).toHaveLength(1);
  });
});
