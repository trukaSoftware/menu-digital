import axios from 'axios';
import { vi } from 'vitest';

import { render, screen, cleanup } from '@testing-library/react';

import DeleteProductDialog, { DeleteProductDialogProps } from '..';

import userEvent from '@testing-library/user-event';

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProps = {
  productId: `1`,
  categoryId: `1`,
  removeProductFromList: vi.fn(),
} as DeleteProductDialogProps;

describe(`DeleteProductDialog`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`Should open delete product dialog when clicking on Trigger button"`, async () => {
    render(<DeleteProductDialog {...mockProps} />);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();

    const triggerButton = screen.getByRole(`button`);

    await userEvent.click(triggerButton);

    expect(await screen.findByRole(`dialog`)).toBeInTheDocument();
  });

  it(`When clicking on yes button and axios response return data.delete equals to false should render error text "Falha ❌"`, async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: { deleted: false } });

    render(<DeleteProductDialog {...mockProps} />);

    const triggerButton = screen.getByRole(`button`);

    await userEvent.click(triggerButton);

    const yesButton = screen.getByRole(`button`, { name: `Sim` });

    await userEvent.click(yesButton);

    expect(
      await screen.findByRole(`button`, { name: `Falha ❌` })
    ).toBeInTheDocument();
  });

  it(`When clicking on yes button and axios response return data.delete equals to true should close dialog`, async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: { deleted: true } });

    render(<DeleteProductDialog {...mockProps} />);

    const triggerButton = screen.getByRole(`button`);

    await userEvent.click(triggerButton);

    expect(screen.getByRole(`dialog`)).toBeInTheDocument();

    const yesButton = screen.getByRole(`button`, { name: `Sim` });

    await userEvent.click(yesButton);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();
  });

  it(`When clicking on button with text "Não" should close dialog`, async () => {
    render(<DeleteProductDialog {...mockProps} />);

    const triggerButton = screen.getByRole(`button`);

    await userEvent.click(triggerButton);

    expect(screen.getByRole(`dialog`)).toBeInTheDocument();

    const noButton = screen.getByRole(`button`, { name: `Não` });

    await userEvent.click(noButton);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();
  });
});
