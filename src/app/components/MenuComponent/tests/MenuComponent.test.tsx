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
    menuInformations: [
      {
        menuTitle: `Criar novo(a)`,
        items: [
          {
            menuIcon: vi.fn(),
            dialogHeadLineText: `Criação de produto`,
            itemText: `Produtos`,
            DialogBody: vi.fn().mockImplementation(() => <span>test</span>),
          },
          {
            menuIcon: vi.fn(),
            dialogHeadLineText: `Criação de categoria`,
            itemText: `Categorias`,
            DialogBody: vi.fn().mockImplementation(() => <span>test</span>),
          },
        ],
      },
    ],
    companyInfos: {
      slug: `mockSlug`,
      companyId: `mockCompanyId`,
    },
  } as MenuComponentProps;

  it(`if DialogBody is passed and the button Produtos is clicked should open a dialog with headline text "Criação de produto"`, async () => {
    render(<MenuComponent {...mockProps} />);

    const createProductButton = screen.getByRole(`button`, {
      name: /Produtos/i,
    });

    fireEvent.click(createProductButton);

    expect(await screen.findByText(`Criação de produto`)).toBeInTheDocument();
  });

  it(`if DialogBody is passed and the button Categorias is clicked should open a dialog with headline text "Criação de categoria"`, async () => {
    render(<MenuComponent {...mockProps} />);

    const createCategoryButton = screen.getByRole(`button`, {
      name: /Categorias/i,
    });

    fireEvent.click(createCategoryButton);

    expect(await screen.findByText(`Criação de categoria`)).toBeInTheDocument();
  });

  it(`if DialogBody is not passed, should have a Link element with text "Produtos" and href "/manageProducts/mockSlug/mockCompanyId"`, async () => {
    const modifieldMockProps = {
      menuInformations: [
        {
          menuTitle: `Gerenciar`,
          items: [
            {
              menuIcon: vi.fn(),
              itemText: `Produtos`,
              managementPageHref: `/manageProducts`,
            },
          ],
        },
      ],
      companyInfos: {
        slug: `mockSlug`,
        companyId: `mockCompanyId`,
      },
    } as MenuComponentProps;

    render(<MenuComponent {...modifieldMockProps} />);

    const linkToManageProductsPage = screen.getByRole(`link`);

    expect(linkToManageProductsPage).toBeInTheDocument();
    expect(linkToManageProductsPage).toHaveTextContent(`Produtos`);
    expect(linkToManageProductsPage).toHaveAttribute(
      `href`,
      `/manageProducts/mockSlug/mockCompanyId`
    );
  });

  it(`if DialogBody is not passed, should have a Link element with text "Categorias" and href "/manageCategories/mockSlug/mockCompanyId"`, async () => {
    const modifieldMockProps = {
      menuInformations: [
        {
          menuTitle: `Gerenciar`,
          items: [
            {
              menuIcon: vi.fn(),
              itemText: `Categorias`,
              managementPageHref: `/manageCategories`,
            },
          ],
        },
      ],
      companyInfos: {
        slug: `mockSlug`,
        companyId: `mockCompanyId`,
      },
    } as MenuComponentProps;

    render(<MenuComponent {...modifieldMockProps} />);

    const linkToManageCategoriesPage = screen.getByRole(`link`);

    expect(linkToManageCategoriesPage).toBeInTheDocument();
    expect(linkToManageCategoriesPage).toHaveTextContent(`Categorias`);
    expect(linkToManageCategoriesPage).toHaveAttribute(
      `href`,
      `/manageCategories/mockSlug/mockCompanyId`
    );
  });
});
