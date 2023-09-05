import axios from 'axios';
import { vi } from 'vitest';

import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';

import DeleteCategoryDialog, { DeleteCategoryDialogProps } from '..';

import userEvent from '@testing-library/user-event';

vi.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProps = {
  categoryId: `1`,
  removeCategoryFromList: vi.fn(),
} as DeleteCategoryDialogProps;

describe(`DeleteCategoryDialog`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`Should open delete category dialog when clicking on Trigger button"`, async () => {
    renderWithRedux(<DeleteCategoryDialog {...mockProps} />);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();

    const triggerButton = screen.getByRole(`button`);

    await userEvent.click(triggerButton);

    expect(await screen.findByRole(`dialog`)).toBeInTheDocument();
  });

  it(`When clicking on yes button and axios response return data.delete equals to false should render error text "Falha ❌"`, async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: { deleted: false } });

    renderWithRedux(<DeleteCategoryDialog {...mockProps} />);

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

    renderWithRedux(<DeleteCategoryDialog {...mockProps} />);

    const triggerButton = screen.getByRole(`button`);

    await userEvent.click(triggerButton);

    expect(screen.getByRole(`dialog`)).toBeInTheDocument();

    const yesButton = screen.getByRole(`button`, { name: `Sim` });

    await userEvent.click(yesButton);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();
  });

  it(`When clicking on button with text "Não" should close dialog`, async () => {
    renderWithRedux(<DeleteCategoryDialog {...mockProps} />);

    const triggerButton = screen.getByRole(`button`);

    await userEvent.click(triggerButton);

    expect(screen.getByRole(`dialog`)).toBeInTheDocument();

    const noButton = screen.getByRole(`button`, { name: `Não` });

    await userEvent.click(noButton);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();
  });
});
