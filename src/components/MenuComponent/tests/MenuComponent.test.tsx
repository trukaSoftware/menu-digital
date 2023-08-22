import { vi } from 'vitest';

import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import DefaultSelect from '../../DefaultSelect';

import MenuComponent, { MenuComponentProps } from '..';

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

vi.mock(`axios`);

vi.mock(`@/components/DefaultSelect`);
vi.mocked(DefaultSelect).mockImplementation(() => <></>);

describe(`MenuComponent`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockProps = {
    menuTitle: `Gerenciar`,
    companyInfos: {
      slug: `mockSlug`,
      companyId: `mockCompanyId`,
    },
  } as MenuComponentProps;

  const modifieldMockProps = {
    menuTitle: `Criar novo(a)`,
  } as MenuComponentProps;

  it(`if MenuComponent is called with menuTitle equal to "Gerenciar", a heading level 2 with the text "Gerenciar" should be rendered`, () => {
    render(<MenuComponent {...mockProps} />);

    const title = screen.getByRole(`heading`, { level: 2 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(`Gerenciar`);
  });

  it(`if MenuComponent is called with menuTitle equal to "Criar novo(a)", a heading level 2 with the text "Criar novo(a)" should be rendered`, () => {
    render(<MenuComponent {...modifieldMockProps} />);

    const title = screen.getByRole(`heading`, { level: 2 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(`Criar novo(a)`);
  });

  it(`if MenuComponent is called with companyInfos, should have a Link element with text "Produtos" and href "/manageProducts/mockSlug/mockProductId"`, async () => {
    render(<MenuComponent {...mockProps} />);

    const linkToManageProductsPage = screen.getByTitle(`Produtos`);

    expect(linkToManageProductsPage).toBeInTheDocument();
    expect(linkToManageProductsPage).toHaveTextContent(`Produtos`);
    expect(linkToManageProductsPage).toHaveAttribute(
      `href`,
      `/manageProducts/mockSlug/mockCompanyId`
    );
  });

  it(`if MenuComponent is called with companyInfos, should have a Link element with text "Categorias" and href "/manageCategories/mockSlug/mockCompanyId"`, async () => {
    render(<MenuComponent {...mockProps} />);

    const linkToManageCategoriesPage = screen.getByTitle(`Categorias`);

    expect(linkToManageCategoriesPage).toBeInTheDocument();
    expect(linkToManageCategoriesPage).toHaveTextContent(`Categorias`);
    expect(linkToManageCategoriesPage).toHaveAttribute(
      `href`,
      `/manageCategories/mockSlug/mockCompanyId`
    );
  });

  it(`if MenuComponent is called without companyInfos and the button Produtos is clicked should open a dialog with headline text "Criação de produto"`, async () => {
    render(<MenuComponent {...modifieldMockProps} />);

    const createProductButton = screen.getByRole(`button`, {
      name: /Produtos/i,
    });

    fireEvent.click(createProductButton);

    expect(await screen.findByText(`Criação de produto`)).toBeInTheDocument();
  });

  it(`if MenuComponent is called without companyInfos and the button Categorias is clicked should open a dialog with headline text "Criação de categoria"`, async () => {
    render(<MenuComponent {...modifieldMockProps} />);

    const createCategoryButton = screen.getByRole(`button`, {
      name: /Categorias/i,
    });

    fireEvent.click(createCategoryButton);

    expect(await screen.findByText(`Criação de categoria`)).toBeInTheDocument();
  });
});
