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

  const mockHandleFileChange = vi.fn();

  it(`should render the component with title and icon`, () => {
    const title = `Upload Image`;
    const iconImage = <span data-testid="mock-icon">Icon</span>;
    const id = `upload-input`;

    render(
      <UploadImageInput
        title={title}
        handleFileChange={mockHandleFileChange}
        iconImage={iconImage}
        id={id}
      />
    );

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    const iconElement = screen.getByTestId(`mock-icon`);
    expect(iconElement).toBeInTheDocument();
  });

  it(`should render the element with className "fileUploadedName" if the image name if provided`, () => {
    const imageName = `example.jpg`;
    const id = `upload-input`;
    render(
      <UploadImageInput
        title="Upload Image"
        handleFileChange={mockHandleFileChange}
        iconImage={<span>Icon</span>}
        id={id}
        imageName={imageName}
      />
    );

    const imageNameElement = screen.getByText(imageName);

    expect(imageNameElement).toBeInTheDocument();
    expect(imageNameElement).toHaveClass(`fileUploadedName`);
  });

  it(`should call handleFileChange when file input changes`, async () => {
    const id = `upload-input`;
    render(
      <UploadImageInput
        title="Upload Image"
        handleFileChange={mockHandleFileChange}
        iconImage={<span>Icon</span>}
        id={id}
      />
    );
    const fileInput = screen.getByLabelText(`Upload Image`);

    fireEvent.change(fileInput);

    expect(mockHandleFileChange).toHaveBeenCalledTimes(1);
  });
});
