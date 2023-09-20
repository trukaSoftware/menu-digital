import { vi } from 'vitest';

import Dropdown, { DropdownProps } from '..';

import { categoryMock } from '@/mocks/categories';
import { productsMock } from '@/mocks/products';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({
    user: {
      id: `1`,
      emailAddresses: [
        {
          emailAddress: `test@example.com`,
        },
      ],
    },
  }),
}));

const mockProps = {
  category: categoryMock,
  filteredProducts: productsMock,
  currentCategoryIndex: 0,
  gettingProducts: false,
  showDropdown: null,
  search: ``,
  setSearch: vi.fn(),
  toggleDropdown: vi.fn(),
} as DropdownProps;

describe(`Dropdown`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`When the component is rendered, there should be a category dropdown button`, async () => {
    renderWithRedux(<Dropdown {...mockProps} />);

    const categoryDropdownButton = screen.getByRole(`heading`, {
      name: /reuniao/i,
    });

    expect(categoryDropdownButton).toBeInTheDocument();

    const firstCategoryProduct = screen.queryByText(/pão/i);
    const secondCategoryProduct = screen.queryByText(/guaraná antartica/i);
    const thirdCategoryProduct = screen.queryByText(/guaraná jesus/i);
    const fourthCategoryProduct = screen.queryByText(/smash burguer/i);

    expect(firstCategoryProduct).not.toBeInTheDocument();
    expect(secondCategoryProduct).not.toBeInTheDocument();
    expect(thirdCategoryProduct).not.toBeInTheDocument();
    expect(fourthCategoryProduct).not.toBeInTheDocument();
  });

  it(`When the dropdown is clicked, there must be products inside it`, async () => {
    renderWithRedux(<Dropdown {...mockProps} />);

    const categoryDropdownButton = screen.getByRole(`heading`, {
      name: /reuniao/i,
    });

    let firstCategoryProduct = screen.queryByText(/pão/i);
    let secondCategoryProduct = screen.queryByText(/guaraná antartica/i);
    let thirdCategoryProduct = screen.queryByText(/guaraná jesus/i);
    let fourthCategoryProduct = screen.queryByText(/smash burguer/i);

    expect(firstCategoryProduct).not.toBeInTheDocument();
    expect(secondCategoryProduct).not.toBeInTheDocument();
    expect(thirdCategoryProduct).not.toBeInTheDocument();
    expect(fourthCategoryProduct).not.toBeInTheDocument();

    await userEvent.click(categoryDropdownButton);

    const modifiedMockProps = {
      ...mockProps,
      showDropdown: 0,
    };

    renderWithRedux(<Dropdown {...modifiedMockProps} />);

    firstCategoryProduct = await screen.findByText(/pão/i);
    secondCategoryProduct = await screen.findByText(/guaraná antartica/i);
    thirdCategoryProduct = await screen.findByText(/guaraná jesus/i);
    fourthCategoryProduct = await screen.findByText(/smash burguer/i);

    expect(firstCategoryProduct).toBeInTheDocument();
    expect(secondCategoryProduct).toBeInTheDocument();
    expect(thirdCategoryProduct).toBeInTheDocument();
    expect(fourthCategoryProduct).toBeInTheDocument();
  });
});
