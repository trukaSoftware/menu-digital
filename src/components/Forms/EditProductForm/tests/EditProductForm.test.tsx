import axios from 'axios';
import { vi } from 'vitest';

import { categoriesMock } from '@/mocks/categories';
import { productMock } from '@/mocks/products';
import { createImageMock } from '@/testsUtils/createImageMock';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup, fireEvent } from '@testing-library/react';

import EditProductForm, { EditProductFormProps } from '..';

import userEvent from '@testing-library/user-event';

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock(`@/hooks/useCategories`, () => ({
  __esModule: true,
  useCategories: () => ({
    categories: categoriesMock,
    gettingCategories: false,
  }),
}));

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

describe(`EditProductForm`, () => {
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

  const mockProps = {
    setShowDialog: vi.fn(),
    categoryId: `810640e3-a1ec-414b-ad14-deb1dd3f2989`,
    editProductFromList: vi.fn(),
    product: productMock,
  } as EditProductFormProps;

  it(`When trying to send form and put axios request does not return the product id should render error text on button`, async () => {
    renderWithRedux(<EditProductForm {...mockProps} />);

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

    renderWithRedux(<EditProductForm {...mockProps} />);

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

    renderWithRedux(<EditProductForm {...mockProps} />);

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

    mockedAxios.get.mockResolvedValueOnce({
      data: { categories: categoriesMock, gettingCategories: false },
    });

    renderWithRedux(<EditProductForm {...mockProps} />, {
      preloadedState: { categoriesReducer: { categories: categoriesMock } },
    });

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
