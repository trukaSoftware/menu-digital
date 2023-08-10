import { vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import UploadImageInput from '..';

describe(`UploadImageInput`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const mockProps = {
    id: `upload-input`,
    title: `Upload Image`,
    iconImage: <span data-testid="mock-icon">Icon</span>,
    handleFileChange: vi.fn(),
  };

  it(`should render the component with title and icon`, () => {
    render(<UploadImageInput {...mockProps} />);

    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
    const iconElement = screen.getByTestId(`mock-icon`);
    expect(iconElement).toBeInTheDocument();
  });

  it(`should render the element with className "fileUploadedName" if the image name if provided`, () => {
    const modifiedMockProps = {
      ...mockProps,
      imageName: `Example.jpg`,
    };

    render(<UploadImageInput {...modifiedMockProps} />);

    const imageNameElement = screen.getByText(modifiedMockProps.imageName);

    expect(imageNameElement).toBeInTheDocument();
    expect(imageNameElement).toHaveClass(`fileUploadedName`);
  });

  it(`should call handleFileChange when file input changes`, async () => {
    render(<UploadImageInput {...mockProps} />);
    const fileInput = screen.getByLabelText(`Upload Image`);

    fireEvent.change(fileInput);

    expect(mockProps.handleFileChange).toHaveBeenCalledTimes(1);
  });
});
