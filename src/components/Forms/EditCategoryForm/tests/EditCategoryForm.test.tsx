import axios from 'axios';
import { vi } from 'vitest';

import { categoriesMock } from '@/mocks/categories';
import { productsMock } from '@/mocks/products';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditCategoryForm, { EditCategoryFormProps } from '..';

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

describe(`EditCategoryForm`, () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { products: productsMock, gettingProducts: false },
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
    categoryId: categoriesMock[0].id,
  } as EditCategoryFormProps;

  it(`When trying to send form with category name empty should render category name error`, async () => {
    renderWithRedux(<EditCategoryForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Editar categoria`,
    });

    const editCategoryName = screen.getByPlaceholderText(`Mais vendidos`);

    await userEvent.clear(editCategoryName);

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(
        `É preciso preencher este campo com o nome da categoria.`
      )
    ).toBeInTheDocument();
  });

  it(`When filling search input should render only products that includes the typed string`, async () => {
    renderWithRedux(<EditCategoryForm {...mockProps} />);

    const searchInput = screen.getByPlaceholderText(
      `Pesquisar produto por nome...`
    );

    expect(await screen.findAllByRole(`checkbox`)).toHaveLength(4);

    await userEvent.type(searchInput, `smash`);

    expect(await screen.findAllByRole(`checkbox`)).toHaveLength(1);
    expect(screen.getByText(`Smash burguer`)).toBeInTheDocument();
  });

  it(`When there is no error and submitButton is clicked should change submitButton text to "Categoria editada com sucesso ✔️"`, async () => {
    renderWithRedux(<EditCategoryForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Editar categoria`,
    });

    await userEvent.click(submitButton);

    expect(
      await screen.findByRole(`button`, {
        name: `Categoria editada com sucesso ✔️`,
      })
    ).toBeInTheDocument();
  });

  it(`When there is no error and submitButton is clicked should change submitButton text to "Erro ao enviar, tente novamente."`, async () => {
    mockedAxios.put.mockResolvedValueOnce({
      status: 400,
    });

    renderWithRedux(<EditCategoryForm {...mockProps} />);

    const submitButton = screen.getByRole(`button`, {
      name: `Editar categoria`,
    });

    const editCategoryName = screen.getByPlaceholderText(`Mais vendidos`);

    await userEvent.type(editCategoryName, `Mais vendidos`);

    await userEvent.click(submitButton);

    expect(
      await screen.findByRole(`button`, {
        name: `Erro ao enviar, tente novamente.`,
      })
    ).toBeInTheDocument();
  });

  it(`If product is in the category already, should come checked on products list`, async () => {
    renderWithRedux(<EditCategoryForm {...mockProps} />);

    const checkBoxes = await screen.findAllByRole(`checkbox`);

    expect(checkBoxes).toHaveLength(4);
    checkBoxes.forEach((checkBox) => {
      expect(checkBox).toBeChecked();
    });
  });

  it(`If product isn't in the category, shouldn't come checked on products list`, async () => {
    const modifiedMockProps = {
      ...mockProps,
      categoryId: `random-category-id`,
    } as EditCategoryFormProps;

    renderWithRedux(<EditCategoryForm {...modifiedMockProps} />);

    const checkBoxes = await screen.findAllByRole(`checkbox`);

    expect(checkBoxes).toHaveLength(4);
    checkBoxes.forEach((checkBox) => {
      expect(checkBox).not.toBeChecked();
    });
  });
});
