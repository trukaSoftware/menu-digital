import { vi } from 'vitest';

import { foodCardMock } from '@/mocks/foodCard';
import { render, screen, cleanup } from '@testing-library/react';

import Prices, { PricesProps } from '..';

describe(`Prices`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockProps = {
    price: foodCardMock.price,
    discountedPrice: foodCardMock.discountedPrice,
  } as PricesProps;

  const mockWithoutDiscountedPrice = {
    ...mockProps,
    discountedPrice: undefined,
  } as PricesProps;

  it(`when prop discountedPrice is not passed, shouldn't render discounted price`, () => {
    render(<Prices {...mockWithoutDiscountedPrice} />);

    const discountedPrice = screen.queryByText(`R$ 8,00`);

    expect(discountedPrice).not.toBeInTheDocument();
  });

  it(`when prop discountedPrice is passed, should render discounted price`, () => {
    render(<Prices {...mockProps} />);

    const discountedPrice = screen.getByText(`R$ 8,00`);

    expect(discountedPrice).toBeInTheDocument();
  });

  it(`when prop discountedPrice is not passed, original price shouldn't have style foodCardPriceScratched`, () => {
    render(<Prices {...mockWithoutDiscountedPrice} />);

    const originalPrice = screen.queryByText(`R$ 10,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).not.toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountedPrice is passed, original price should have style foodCardPriceScratched`, () => {
    render(<Prices {...mockProps} />);

    const originalPrice = screen.getByText(`R$ 10,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).toHaveClass(`foodCardPriceScratched`);
  });

  it(`when prop discountedPriceClassName is passed, should load class passed on discounted price span`, () => {
    const modifiedMockProps = {
      ...mockProps,
      discountedPriceClassName: `discountedPriceClassName`,
    } as PricesProps;

    render(<Prices {...modifiedMockProps} />);

    const originalPrice = screen.getByText(`R$ 8,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).toHaveClass(`discountedPriceClassName`);
  });

  it(`when prop priceClassName is passed, should load class passed on price span`, () => {
    const modifiedMockProps = {
      ...mockProps,
      priceClassName: `priceClassName`,
    } as PricesProps;

    render(<Prices {...modifiedMockProps} />);

    const originalPrice = screen.getByText(`R$ 10,00`);

    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice).toHaveClass(`priceClassName`);
  });
});
