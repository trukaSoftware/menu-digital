import { vi } from 'vitest';

import { getProducts } from '@/utils/api/getProducts';

import { productsMock } from '@/mocks/products';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProductsWithSearchInput from '..';

vi.mock(`@/utils/api/getProducts`);
vi.mocked(getProducts).mockImplementation(async () => ({
  products: productsMock,
}));

describe(`When ProductsWithSearchInput is called and`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`has products on products array, the products should be rendered`, async () => {
    renderWithRedux(<ProductsWithSearchInput />);

    expect(await screen.findByText(`Guaraná Antartica`)).toBeInTheDocument();
  });

  it(`there is no products on products array, the text "Não existem produtos cadastrados" should be rendered`, async () => {
    renderWithRedux(<ProductsWithSearchInput />, {
      preloadedState: {
        productsReducer: { products: [] },
      },
    });

    const emptyStateText = await screen.findByText(`Nenhum produto encontrado`);
    const emptyStateNewProductBtn = await screen.findByRole(`button`, {
      name: `Cadastrar produto`,
    });

    expect(emptyStateText).toBeInTheDocument();
    expect(emptyStateNewProductBtn).toBeInTheDocument();

    expect(screen.queryByText(`Guaraná Antartica`)).not.toBeInTheDocument();
  });

  it(`has products and the user search on input, only products with searched text should be rendering`, async () => {
    renderWithRedux(<ProductsWithSearchInput />);

    const products = await screen.findAllByTestId(`products`);

    expect(products.length).toEqual(4);

    const input = screen.getByPlaceholderText(`Pesquisar produto por nome...`);

    await userEvent.type(input, `guaraná antartica`);

    const productsAfterSearch = screen.getAllByTestId(`products`);

    expect(productsAfterSearch.length).toEqual(1);

    expect(await screen.findByText(`Guaraná Antartica`)).toBeInTheDocument();
  });
});
