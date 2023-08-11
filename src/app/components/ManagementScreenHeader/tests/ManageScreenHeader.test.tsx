import { vi } from 'vitest';

import { UserButton } from '@clerk/nextjs';
import { render, screen, cleanup } from '@testing-library/react';

import ManagementScreenHeader, { ManagementScreenHeaderProps } from '..';

vi.mock(`@clerk/nextjs`);
vi.mocked(UserButton).mockImplementation(() => <></>);

describe(`ManagementScreenHeader`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockProps = {
    companyLogoUrl: `/`,
    companyName: `Bar do Marcão`,
    hasBackButton: true,
  } as ManagementScreenHeaderProps;

  it(`if the prop title is passed, an heading level 1 with the text of title prop must be rendered`, () => {
    const modifiedMockProps = {
      companyLogoUrl: `/`,
      title: `Sua Loja`,
      hasBackButton: true,
    } as ManagementScreenHeaderProps;

    render(<ManagementScreenHeader {...modifiedMockProps} />);

    const title = screen.getByRole(`heading`, {
      name: `Sua Loja`,
      level: 1,
    });

    expect(title).toBeInTheDocument();
  });

  it(`if the prop title is not passed, an heading level 1 with the text of companyName prop must be rendered`, () => {
    render(<ManagementScreenHeader {...mockProps} />);

    const title = screen.getByRole(`heading`, {
      name: `Bar do Marcão`,
      level: 1,
    });

    expect(title).toBeInTheDocument();
  });

  it(`if hasBackButton is passed, an element with the role "link" and title "Voltar para página anterior" must be rendered`, () => {
    render(<ManagementScreenHeader {...mockProps} />);

    const backLink = screen.getByRole(`link`);

    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute(`title`, `Voltar para página anterior`);
  });

  it(`if hasBackButton is not passed, an element with the role "link" and title "Voltar para página anterior" must not be rendered`, () => {
    const modifiedMockProps = {
      companyLogoUrl: `/`,
      companyName: `Bar do Marcão`,
    } as ManagementScreenHeaderProps;

    render(<ManagementScreenHeader {...modifiedMockProps} />);

    const backLink = screen.queryByRole(`link`);

    expect(backLink).not.toBeInTheDocument();
  });
});
