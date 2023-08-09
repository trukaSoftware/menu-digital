import axios from 'axios';
import { vi } from 'vitest';

import { categories } from '@/app/mocks/categories';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import CreateProductForm from '..';

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

describe(`CreateProductForm`, () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { categories, gettingCategories: false },
    });
  });

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

  it(`When trying to send form without filling the product name input should render error`, async () => {
    render(<CreateProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Criar produto`,
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        `É preciso preencher este campo com o nome do produto.`
      )
    ).toBeInTheDocument();
  });

  it(`When trying to send form without filling the product description input should render error`, async () => {
    render(<CreateProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Criar produto`,
    });

    const productNameInput = screen.getByPlaceholderText(`Hamburguer`);

    fireEvent.change(productNameInput, `hamburguer`);

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        `É preciso preencher este campo com a descrição do produto.`
      )
    ).toBeInTheDocument();
  });

  it(`When trying to send form without filling the product price input should render error`, async () => {
    render(<CreateProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Criar produto`,
    });

    const productNameInput = screen.getByPlaceholderText(`Hamburguer`);

    fireEvent.change(productNameInput, `hamburguer`);

    const productDescriptionInput = screen.getByLabelText(`Descrição*`);

    fireEvent.change(productDescriptionInput, `Descrição`);

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        `É preciso preencher este campo com o preço do produto.`
      )
    ).toBeInTheDocument();
  });

  it(`When trying to send form without choosing an option of the product category select should render error`, async () => {
    render(<CreateProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Criar produto`,
    });

    const productNameInput = screen.getByPlaceholderText(`Hamburguer`);

    fireEvent.change(productNameInput, `hamburguer`);

    const productDescriptionInput = screen.getByLabelText(`Descrição*`);

    fireEvent.change(productDescriptionInput, `Descrição`);

    const productPriceInput = screen.getByLabelText(`Preço*`);

    fireEvent.change(productPriceInput, `23`);

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        `É preciso selecionar ao menos uma categoria para o produto.`
      )
    ).toBeInTheDocument();
  });

  it(`When trying to sending form filling the all fields of product form shouldn't render error`, async () => {
    render(<CreateProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Criar produto`,
    });

    const productNameInput = screen.getByPlaceholderText(`Hamburguer`);

    fireEvent.change(productNameInput, `hamburguer`);

    const productDescriptionInput = screen.getByLabelText(`Descrição*`);

    fireEvent.change(productDescriptionInput, `Descrição`);

    const productPriceInput = screen.getByLabelText(`Preço*`);

    fireEvent.change(productPriceInput, `23`);

    const productSelectInput = screen.getByRole(`combobox`);

    fireEvent.click(productSelectInput);

    const option = await screen.findByText(/Caldinho/i);

    expect(option).toBeInTheDocument();

    fireEvent.click(option);

    fireEvent.click(submitButton);

    expect(
      screen.queryByText(
        `É preciso preencher este campo com o nome do produto.`
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        `É preciso preencher este campo com a descrição do produto.`
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        `É preciso preencher este campo com o preço do produto.`
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        `É preciso selecionar ao menos uma categoria para o produto.`
      )
    ).not.toBeInTheDocument();
  });
});
