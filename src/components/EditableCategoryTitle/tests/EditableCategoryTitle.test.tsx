import { vi } from 'vitest';

import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';

import EditableCategoryTitle, { EditableCategoryTitleProps } from '..';

import userEvent from '@testing-library/user-event';

const mockProps = {
  categoryId: `1`,
  categoryName: `1`,
  removeCategoryFromList: vi.fn(),
} as EditableCategoryTitleProps;

describe(`EditableCategoryTitle`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`Should render delete category dialog when clicking in delete category trigger button`, async () => {
    renderWithRedux(<EditableCategoryTitle {...mockProps} />);

    expect(screen.queryByRole(`dialog`)).not.toBeInTheDocument();

    const deleteCategoryTriggerButton = screen.getByRole(`button`, {
      name: `Excluir categoria`,
    });

    await userEvent.click(deleteCategoryTriggerButton);

    expect(screen.getByRole(`dialog`)).toBeInTheDocument();
    expect(
      screen.getByText(`Deseja realmente excluir esta categoria?`, {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});
