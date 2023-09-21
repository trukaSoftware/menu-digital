import { vi } from 'vitest';

import Dropdown, { DropdownProps } from '..';

import { categoryMock } from '@/mocks/categories';
import { productsMock } from '@/mocks/products';
import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';

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

  it(`When the component is rendered and showDropdown is null, there should be a closed dropdown`, async () => {
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

  it(`When the component is rendered and showDropdown is not null, there should be a dropdown menu open with products inside it`, async () => {
    const modifiedMockProps = {
      ...mockProps,
      showDropdown: 0,
    };

    renderWithRedux(<Dropdown {...modifiedMockProps} />);

    const firstCategoryProduct = screen.queryByText(/pão/i);
    const secondCategoryProduct = screen.queryByText(/guaraná antartica/i);
    const thirdCategoryProduct = screen.queryByText(/guaraná jesus/i);
    const fourthCategoryProduct = screen.queryByText(/smash burguer/i);

    expect(firstCategoryProduct).toBeInTheDocument();
    expect(secondCategoryProduct).toBeInTheDocument();
    expect(thirdCategoryProduct).toBeInTheDocument();
    expect(fourthCategoryProduct).toBeInTheDocument();
  });
});
