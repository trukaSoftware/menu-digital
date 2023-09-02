import axios from 'axios';
import { vi } from 'vitest';

import { categoriesMock } from '@/mocks/categories';
import { productMock } from '@/mocks/products';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableFoodCard, { EditableFoodCardProps } from '..';

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProps = {
  product: productMock,
  id: `1`,
  removeProductFromList: vi.fn(),
  editProductFromList: vi.fn(),
  categoryId: `1`,
} as EditableFoodCardProps;

const mockPropsWithoutDiscount = {
  product: { ...productMock, discount: undefined },
  removeProductFromList: vi.fn(),
  editProductFromList: vi.fn(),
  categoryId: `1`,
} as EditableFoodCardProps;

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

describe(`EditableFoodCard`, () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { categories: categoriesMock, gettingCategories: false },
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`check if h3 is beeing rendered`, () => {
    renderWithRedux(<EditableFoodCard {...mockProps} />);

    const heading = screen.getByRole(`heading`, {
      name: `Pão`,
      level: 3,
    });

    expect(heading).toBeVisible();
  });

  it(`when prop discountedPrice is not passed, shouldn't render discounted price`, () => {
    renderWithRedux(<EditableFoodCard {...mockPropsWithoutDiscount} />);

    const discountedPrice = screen.queryByText(`R$ 8,00`);

    expect(discountedPrice).not.toBeInTheDocument();
  });

  it(`when prop discountedPrice is passed, should render discounted price`, () => {
    renderWithRedux(<EditableFoodCard {...mockProps} />);

    const discountedPrice = screen.getByText(`R$ 12,00`);

    expect(discountedPrice).toBeInTheDocument();
  });

  it(`when prop discountedPrice is not passed, original price shouldn't have style foodCardPriceScratched`, () => {
    renderWithRedux(<EditableFoodCard {...mockPropsWithoutDiscount} />);

    const originalPrice = screen.queryByText(`R$ 12,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).not.toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountedPrice is passed, original price should have style foodCardPriceScratched`, () => {
    renderWithRedux(<EditableFoodCard {...mockProps} />);

    const originalPrice = screen.getByText(`R$ 12,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountPercentage is not passed, shouldn't render discount percentage`, () => {
    renderWithRedux(<EditableFoodCard {...mockPropsWithoutDiscount} />);

    const discountPercentage = screen.queryByText(`20%`);

    expect(discountPercentage).not.toBeInTheDocument();
  });

  it(`when prop discountPercentage is passed, should render discount percentage`, () => {
    renderWithRedux(<EditableFoodCard {...mockProps} />);

    const discountPercentage = screen.getByText(`20%`);

    expect(discountPercentage).toBeInTheDocument();
  });

  it(`should load buttons with text "Editar" and "Excluir"`, () => {
    renderWithRedux(<EditableFoodCard {...mockProps} />);

    const editBtn = screen.getByRole(`button`, { name: `Editar` });
    const delBtn = screen.getByRole(`button`, { name: `Excluir` });

    expect(editBtn).toBeInTheDocument();
    expect(delBtn).toBeInTheDocument();
  });

  it(`should open delete modal when clicking on the modal button`, async () => {
    renderWithRedux(<EditableFoodCard {...mockProps} />);

    const delBtn = screen.getByRole(`button`, { name: `Excluir` });

    await userEvent.click(delBtn);

    expect(
      screen.getByText(`Deseja realmente excluir este produto?`, {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it(`should open edit modal when clicking on the modal button`, async () => {
    renderWithRedux(<EditableFoodCard {...mockProps} />);

    const editBtn = screen.getByRole(`button`, { name: `Editar` });

    await userEvent.click(editBtn);

    expect(
      screen.getByText(`Edição de produto`, {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});
