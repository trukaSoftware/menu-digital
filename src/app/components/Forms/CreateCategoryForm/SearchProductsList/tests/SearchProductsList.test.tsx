import { vi } from 'vitest';

import { productsMocks } from '@/app/mocks/products';
import { render, screen, cleanup } from '@testing-library/react';

import SearchProductsList, { SearchProductsListProps } from '..';

const mockProps = {
  filteredProducts: productsMocks,
  register: {},
  gettingProducts: false,
} as SearchProductsListProps;

describe(`SearchProductsList`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`If gettingProducts prop is true should load p with text "Buscando produtos"`, () => {
    render(<SearchProductsList {...mockProps} gettingProducts />);

    expect(screen.getByText(/buscando produtos/i)).toBeInTheDocument();
  });

  it(`If gettingProducts prop is false shouldn't load p with text "Buscando produtos"`, () => {
    render(<SearchProductsList {...mockProps} />);

    expect(screen.queryByText(/buscando produtos/i)).not.toBeInTheDocument();
  });

  it(`If gettingProducts prop is false and filteredProducts is empty should load p with text "Nenhum produto encontrado"`, () => {
    render(<SearchProductsList {...mockProps} filteredProducts={[]} />);

    expect(screen.getByText(/nenhum produto encontrado/i)).toBeInTheDocument();
  });

  it(`If gettingProducts prop is false and filteredProducts is empty shouldn't load p with text "Nenhum produto encontrado"`, () => {
    render(
      <SearchProductsList
        {...mockProps}
        filteredProducts={[]}
        gettingProducts
      />
    );

    expect(
      screen.queryByText(/nenhum produto encontrado/i)
    ).not.toBeInTheDocument();
  });

  it(`If gettingProducts prop is false and there is products in filteredProducts shouldn't load p with text "Nenhum produto encontrado"`, () => {
    render(<SearchProductsList {...mockProps} gettingProducts={false} />);

    expect(
      screen.queryByText(/nenhum produto encontrado/i)
    ).not.toBeInTheDocument();
  });
});
