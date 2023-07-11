import { vi } from 'vitest';

import { render, screen, cleanup } from '@testing-library/react';

import FoodCard from '..';

import { mockFoodCard, mockFoodCardWithoutDiscount } from '../mocks';

describe(`FoodCard`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`check if h3 is beeing rendered`, () => {
    render(<FoodCard {...mockFoodCard} />);

    const heading = screen.getByRole(`heading`, {
      name: `Nome do Produto`,
      level: 3,
    });

    expect(heading).toBeVisible();
  });

  it(`when prop discountedPrice is not passed, shouldn't render discounted price`, () => {
    render(<FoodCard {...mockFoodCardWithoutDiscount} />);

    const discountedPrice = screen.queryByText(`R$ 8`);

    expect(discountedPrice).not.toBeInTheDocument();
  });

  it(`when prop discountedPrice is passed, should render discounted price`, () => {
    render(<FoodCard {...mockFoodCard} />);

    const discountedPrice = screen.getByText(`R$ 8`);

    expect(discountedPrice).toBeInTheDocument();
  });

  it(`when prop discountedPrice is not passed, original price shouldn't have style foodCardPriceScratched`, () => {
    render(<FoodCard {...mockFoodCardWithoutDiscount} />);

    const originalPrice = screen.queryByText(`R$ 10`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).not.toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountedPrice is passed, original price should have style foodCardPriceScratched`, () => {
    render(<FoodCard {...mockFoodCard} />);

    const originalPrice = screen.getByText(`R$ 10`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountPercentage is not passed, shouldn't render discount percentage`, () => {
    render(<FoodCard {...mockFoodCardWithoutDiscount} />);

    const discountPercentage = screen.queryByText(`%20`);

    expect(discountPercentage).not.toBeInTheDocument();
  });

  it(`when prop discountPercentage is passed, should render discount percentage`, () => {
    render(<FoodCard {...mockFoodCard} />);

    const discountPercentage = screen.getByText(`20%`);

    expect(discountPercentage).toBeInTheDocument();
  });
});
