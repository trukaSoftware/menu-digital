import { vi } from 'vitest';

import {
  foodCardMock,
  foodCardWithoutDiscountMock,
} from '@/app/mocks/foodCard';
import { render, screen, cleanup } from '@testing-library/react';

import EditableFoodCard from '..';

const mockProps = {
  ...foodCardMock,
  id: `1`,
};

const mockPropsWithoutDiscount = {
  ...foodCardWithoutDiscountMock,
  id: `1`,
};

describe(`FoodCard`, () => {
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
      name: `Nome do Produto`,
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

    const discountedPrice = screen.getByText(`R$ 8,00`);

    expect(discountedPrice).toBeInTheDocument();
  });

  it(`when prop discountedPrice is not passed, original price shouldn't have style foodCardPriceScratched`, () => {
    render(<EditableFoodCard {...mockPropsWithoutDiscount} />);

    const originalPrice = screen.queryByText(`R$ 10,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).not.toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountedPrice is passed, original price should have style foodCardPriceScratched`, () => {
    render(<EditableFoodCard {...mockProps} />);

    const originalPrice = screen.getByText(`R$ 10,00`);

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
});
