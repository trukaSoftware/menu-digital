import { vi } from 'vitest';

import { productsMocks } from '@/mocks/products';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getProducts } from '@/utils/api/getProducts';

import ProductsWithSearchInput from '..';

vi.mock(`@/utils/api/getProducts`);
vi.mocked(getProducts).mockImplementation(async () => ({
  products: productsMocks,
}));

describe(`Prices`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`When ProductsWithSearchInput is called and has products on products array, the products should be rendered`, async () => {
    render(<ProductsWithSearchInput companyId="mockId" />);

    expect(await screen.findByText(`Guaraná Antartica`)).toBeInTheDocument();
  });

  it(`When ProductsWithSearchInput is called and there is no products on products array, the text "Não existem produtos cadastrados" should be rendered`, async () => {
    vi.mocked(getProducts).mockImplementation(async () => ({
      products: [],
    }));

    render(<ProductsWithSearchInput companyId="mockId" />);

    expect(
      await screen.findByText(`Não existem produtos cadastrados`)
    ).toBeInTheDocument();

    expect(screen.queryByText(`Guaraná Antartica`)).not.toBeInTheDocument();
  });

  it(`When ProductsWithSearchInput is called and has products and the user search on input, only products with searched text should be rendering`, async () => {
    vi.mocked(getProducts).mockImplementation(async () => ({
      products: productsMocks,
    }));

    render(<ProductsWithSearchInput companyId="mockId" />);

    const products = await screen.findAllByTestId(`products`);

    expect(products.length).toEqual(4);

    const input = screen.getByPlaceholderText(`Pesquisar produto por nome...`);

    await userEvent.type(input, `guaraná antartica`);

    const productsAfterSearch = screen.getAllByTestId(`products`);

    expect(productsAfterSearch.length).toEqual(1);

    expect(await screen.findByText(`Guaraná Antartica`)).toBeInTheDocument();
  });
});
