import { vi } from 'vitest';

import { foodCardMock, foodCardWithoutDiscountMock } from '@/mocks/foodCard';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import { renderWithRedux } from '@/testsUtils/providers';

import FoodCardDialog, { FoodCardDialogProps } from '..';

describe(`FoodCardDialog`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockProps = {
    foodCard: foodCardMock,
  } as FoodCardDialogProps;

  it(`when prop discountPercentage is passed should load discount percentage div with the passed percentage`, () => {
    renderWithRedux(<FoodCardDialog {...mockProps} />);

    const foodCard = screen.getByRole(`article`);

    expect(foodCard).toBeInTheDocument();

    fireEvent.click(foodCard);

    const modalCloseButton = screen.getByRole(`button`, {
      name: /Fechar modal/i,
    });

    expect(modalCloseButton).toBeInTheDocument();

    const discount = screen.getByTestId(`modal-discount-tag`);

    expect(discount).toBeInTheDocument();
    expect(discount).toHaveTextContent(
      `${mockProps.foodCard.discountPercentage}%`
    );
  });

  it(`when prop discountPercentage isn't passed shouldn't load discount percentage div`, () => {
    const modifiedMockProps = {
      foodCard: foodCardWithoutDiscountMock,
    } as FoodCardDialogProps;

    renderWithRedux(<FoodCardDialog {...modifiedMockProps} />);

    const foodCard = screen.getByRole(`article`);

    expect(foodCard).toBeInTheDocument();

    fireEvent.click(foodCard);

    const modalCloseButton = screen.getByRole(`button`, {
      name: /Fechar modal/i,
    });

    expect(modalCloseButton).toBeInTheDocument();

    const discount = screen.queryByTestId(`modal-discount-tag`);

    expect(discount).not.toBeInTheDocument();
  });
});
