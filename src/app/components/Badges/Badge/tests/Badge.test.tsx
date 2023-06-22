import { render, screen, cleanup } from '@testing-library/react';

import Badge, { BadgeProps } from '..';

const mockProps = {
  badgeName: `Caldinho`,
  isSelected: false,
  linkTo: `#caldinho`,
  onClick: jest.fn(),
} as BadgeProps;

describe(`Badge`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  test(`When prop isSelected equals to true should should have class "selected"`, () => {
    const modifiedMockProps = {
      ...mockProps,
      isSelected: true,
    } as BadgeProps;

    render(<Badge {...modifiedMockProps} />);

    expect(screen.getByText(modifiedMockProps.badgeName)).toHaveClass(
      `selected`
    );
  });

  test(`When prop isSelected equals to true should should have class "selected"`, () => {
    render(<Badge {...mockProps} />);

    expect(screen.getByText(mockProps.badgeName)).not.toHaveClass(`selected`);
  });
});
