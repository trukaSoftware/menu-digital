import axios from 'axios';
import { vi } from 'vitest';

import { categories } from '@/mocks/categories';
import { productMock } from '@/mocks/products';
import { createImageMock } from '@/testsUtils/createImageMock';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import EditProductForm, { EditProductFormProps } from '..';

import userEvent from '@testing-library/user-event';

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

describe(`EditProductForm`, () => {
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
    categoryId: `1`,
    editProductFromList: vi.fn(),
    product: productMock,
  } as EditProductFormProps;

  it(`When trying to send form and put axios request does not return the product id should render error text on button`, async () => {
    render(<EditProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Editar produto`,
    });

    const productNameInput = screen.getByPlaceholderText(`Hamburguer`);

    fireEvent.change(productNameInput, ``);

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole(`button`, {
        name: `Erro ao enviar, tente novamente.`,
      })
    ).toBeInTheDocument();
  });

  it(`When trying to send form and post axios request return message prop diffrent from "Imagens adicionadas com sucesso" should render "Erro ao enviar, tente novamente." on send button`, async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: { productData: productMock },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: { message: `mensagem de erro` },
    });
    mockedAxios.delete.mockResolvedValueOnce({
      data: { deleted: true },
    });

    render(<EditProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Editar produto`,
    });

    const productImageInput = screen.getByTestId(`productImageInput`);

    const logoImageFile = createImageMock();

    await userEvent.upload(productImageInput, logoImageFile);

    const productNameInput = screen.getByPlaceholderText(`Hamburguer`);

    fireEvent.change(productNameInput, ``);

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole(`button`, {
        name: `Erro ao enviar, tente novamente.`,
      })
    ).toBeInTheDocument();
  });

  it(`When trying to send form and delete axios request return deleted prop equals to false should render "Erro ao enviar, tente novamente." on send button`, async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: { productData: productMock },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: { message: `Imagens adicionadas com sucesso` },
    });
    mockedAxios.delete.mockResolvedValueOnce({
      data: { deleted: false },
    });

    render(<EditProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Editar produto`,
    });

    const productImageInput = screen.getByTestId(`productImageInput`);

    const logoImageFile = createImageMock();

    await userEvent.upload(productImageInput, logoImageFile);

    const productNameInput = screen.getByPlaceholderText(`Hamburguer`);

    fireEvent.change(productNameInput, ``);

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole(`button`, {
        name: `Erro ao enviar, tente novamente.`,
      })
    ).toBeInTheDocument();
  });

  it(`When trying to send form and no error occurs should render text "Produto editado com sucesso ✔️" on submit button`, async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: { productData: productMock },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: { message: `Imagens adicionadas com sucesso` },
    });
    mockedAxios.delete.mockResolvedValueOnce({
      data: { deleted: true },
    });

    render(<EditProductForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Editar produto`,
    });

    const productNameInput = screen.getByPlaceholderText(`Hamburguer`);

    fireEvent.change(productNameInput, ``);

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole(`button`, {
        name: `Produto editado com sucesso ✔️`,
      })
    ).toBeInTheDocument();
  });
});
