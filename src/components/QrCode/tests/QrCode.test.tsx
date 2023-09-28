import { vi } from 'vitest';

import { renderWithRedux } from '@/testsUtils/providers';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import QrCode from '..';

vi.mock(`@clerk/nextjs`, () => ({
  __esModule: true,
  useUser: () => ({
    user: {
      id: `1`,
      publicMetadata: {
        slug: `slug`,
      },
    },
  }),
}));

describe(`QRCode`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`When clicked on the save button, it should save a screenshot`, async () => {
    renderWithRedux(<QrCode />);

    window.print = vi.fn();

    const qrCodeButton = screen.getByRole(`button`, { name: /salvar qrcode/i });

    await userEvent.click(qrCodeButton);

    expect(window.print).toHaveBeenCalled();
  });
});
