import { vi } from 'vitest';

import { productMock } from '@/mocks/products';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableFoodCard, { EditableFoodCardProps } from '..';

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
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`check if h3 is beeing rendered`, () => {
    render(<EditableFoodCard {...mockProps} />);

    const heading = screen.getByRole(`heading`, {
      name: `Pão`,
      level: 3,
    });

    expect(heading).toBeVisible();
  });

  it(`when prop discountedPrice is not passed, shouldn't render discounted price`, () => {
    render(<EditableFoodCard {...mockPropsWithoutDiscount} />);

    const discountedPrice = screen.queryByText(`R$ 8,00`);

    expect(discountedPrice).not.toBeInTheDocument();
  });

  it(`when prop discountedPrice is passed, should render discounted price`, () => {
    render(<EditableFoodCard {...mockProps} />);

    const discountedPrice = screen.getByText(`R$ 12,00`);

    expect(discountedPrice).toBeInTheDocument();
  });

  it(`when prop discountedPrice is not passed, original price shouldn't have style foodCardPriceScratched`, () => {
    render(<EditableFoodCard {...mockPropsWithoutDiscount} />);

    const originalPrice = screen.queryByText(`R$ 12,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).not.toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountedPrice is passed, original price should have style foodCardPriceScratched`, () => {
    render(<EditableFoodCard {...mockProps} />);

    const originalPrice = screen.getByText(`R$ 12,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountPercentage is not passed, shouldn't render discount percentage`, () => {
    render(<EditableFoodCard {...mockPropsWithoutDiscount} />);

    const discountPercentage = screen.queryByText(`20%`);

    expect(discountPercentage).not.toBeInTheDocument();
  });

  it(`when prop discountPercentage is passed, should render discount percentage`, () => {
    render(<EditableFoodCard {...mockProps} />);

    const discountPercentage = screen.getByText(`20%`);

    expect(discountPercentage).toBeInTheDocument();
  });

  it(`should load buttons with text "Editar" and "Excluir"`, () => {
    render(<EditableFoodCard {...mockProps} />);

    const editBtn = screen.getByRole(`button`, { name: `Editar` });
    const delBtn = screen.getByRole(`button`, { name: `Excluir` });

    expect(editBtn).toBeInTheDocument();
    expect(delBtn).toBeInTheDocument();
  });

  it(`should open delete modal when clicking on the modal button`, async () => {
    render(<EditableFoodCard {...mockProps} />);

    const delBtn = screen.getByRole(`button`, { name: `Excluir` });

    await userEvent.click(delBtn);

    expect(
      screen.getByText(`Deseja realmente excluir este produto?`, {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it(`should open edit modal when clicking on the modal button`, async () => {
    render(<EditableFoodCard {...mockProps} />);

    const editBtn = screen.getByRole(`button`, { name: `Editar` });

    await userEvent.click(editBtn);

    expect(
      screen.getByText(`Edição de produto`, {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});
