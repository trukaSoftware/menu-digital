import axios from 'axios';
import { vi } from 'vitest';

import { productsMock } from '@/mocks/products';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import CreateCategoryForm from '..';

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

describe(`CreateCategoryForm`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockProps = {
    setShowDialog: vi.fn(),
  };

  it(`When trying to send form without filling the category name input should render error`, async () => {
    render(<CreateCategoryForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Criar categoria`,
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        `É preciso preencher este campo com o nome da categoria.`
      )
    ).toBeInTheDocument();
  });

  it(`When trying to sending form filling the category name input shouldn't render error`, async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { products: productsMock },
    });

    render(<CreateCategoryForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Criar categoria`,
    });

    const categoryNameInput = await screen.findByPlaceholderText(
      `Mais vendidos`
    );

    fireEvent.input(categoryNameInput, `Mais vendidos`);

    fireEvent.click(submitButton);

    expect(
      screen.queryByText(
        `É preciso preencher este campo com o nome da categoria.`
      )
    ).not.toBeInTheDocument();
  });
});
