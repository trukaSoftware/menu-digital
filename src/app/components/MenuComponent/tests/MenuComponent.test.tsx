import { vi } from 'vitest';

import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import MenuComponent, { MenuComponentProps } from '..';

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

  it(`if MenuComponent is called with menuTitle equal to "Gerenciar", a heading level 2 with the text "Gerenciar" should be rendered`, () => {
    render(<MenuComponent {...mockProps} />);

    const title = screen.getByRole(`heading`, { level: 2 });

    expect(title).toHaveTextContent(`Gerenciar`);
  });

  it(`if MenuComponent is called with menuTitle equal to "Criar novo(a)", a heading level 2 with the text "Criar novo(a)" should be rendered`, () => {
    const modifieldMockProps = {
      ...mockProps,
      menuTitle: `Criar novo(a)`,
    };

    render(<MenuComponent {...modifieldMockProps} />);

    const title = screen.getByRole(`heading`, { level: 2 });

    expect(title).toHaveTextContent(`Criar novo(a)`);
  });

  it(`if MenuComponent is called with companyInfos, should have a Link element with text "Produtos" and href "/manageProducts/mockSlug/mockCompanyId"`, async () => {
    render(<MenuComponent {...mockProps} />);

    const linkToManageProductsPage = screen.getByTitle(`Produtos`);

    expect(linkToManageProductsPage).toBeInTheDocument();
    expect(linkToManageProductsPage).toHaveTextContent(`Produtos`);
    expect(linkToManageProductsPage).toHaveAttribute(
      `href`,
      `/manageProducts/mockSlug/mockCompanyId`
    );
  });

  it(`if DialogBody is not passed, should have a Link element with text "Categorias" and href "/manageCategories/mockSlug/mockCompanyId"`, async () => {
    const modifieldMockProps = {
      ...mockProps,
      companyInfos: {
        slug: `mockSlug`,
        companyId: `mockCompanyId`,
      },
    } as MenuComponentProps;

    render(<MenuComponent {...modifieldMockProps} />);

    const linkToManageCategoriesPage = screen.getByTitle(`Categorias`);

    expect(linkToManageCategoriesPage).toBeInTheDocument();
    expect(linkToManageCategoriesPage).toHaveTextContent(`Categorias`);
    expect(linkToManageCategoriesPage).toHaveAttribute(
      `href`,
      `/manageCategories/mockSlug/mockCompanyId`
    );

    it(`if MenuComponent is called without companyInfos and the button Produtos is clicked should open a dialog with headline text "Criação de produto"`, async () => {
      render(<MenuComponent {...mockProps} />);

      const createProductButton = screen.getByRole(`button`, {
        name: /Produtos/i,
      });

      fireEvent.click(createProductButton);

      expect(await screen.findByText(`Criação de produto`)).toBeInTheDocument();
    });

    it(`if MenuComponent is called without companyInfos and the button Categorias is clicked should open a dialog with headline text "Criação de categoria"`, async () => {
      render(<MenuComponent {...mockProps} />);

      const createCategoryButton = screen.getByRole(`button`, {
        name: /Categorias/i,
      });

      fireEvent.click(createCategoryButton);

      expect(
        await screen.findByText(`Criação de categoria`)
      ).toBeInTheDocument();
    });
  });
});
