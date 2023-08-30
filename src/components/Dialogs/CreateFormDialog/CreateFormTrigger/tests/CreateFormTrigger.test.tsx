import { vi } from 'vitest';

import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateProductPortal from '@/components/Dialogs/CreateProductDialog/CreateProductPortal';
import CreateCategoryPortal from '@/components/Dialogs/CreateCategoryDialog/CreateCategoryPortal';

import CreateFormTrigger from '..';

vi.mock(`@/components/Dialogs/CreateProductDialog/CreateProductPortal`);
vi.mock(`@/components/Dialogs/CreateCategoryDialog/CreateCategoryPortal`);

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({ user: { id: `1` } }),
}));

describe(`CreateFormTrigger`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`When CreateFormTrigger is called with formType prop equal to product-form, should be rendered the CreateProductPortal component`, async () => {
    vi.mocked(CreateProductPortal).mockImplementation(() => (
      <p>Criação de produto</p>
    ));

    render(<CreateFormTrigger title="Produtos" formType="product-form" />);

    const button = await screen.findByRole(`button`, { name: `Criar` });

    await userEvent.click(button);

    expect(await screen.findByText(`Criação de produto`)).toBeInTheDocument();
  });

  it(`When CreateFormTrigger is called with formType prop equal to product-form, should be rendered the CreateProductPortal component`, async () => {
    vi.mocked(CreateCategoryPortal).mockImplementation(() => (
      <p>Criação de categoria</p>
    ));

    render(<CreateFormTrigger title="Categorias" formType="category-form" />);

    const button = await screen.findByRole(`button`, { name: `Criar` });

    await userEvent.click(button);

    expect(await screen.findByText(`Criação de categoria`)).toBeInTheDocument();
  });
});
