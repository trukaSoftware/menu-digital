import { vi } from 'vitest';

import { createImageMock } from '@/app/testsUtils/createImageMock';
import { createCompany } from '@/app/utils/api/createCompany';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateCompany from '../page';

vi.mock(`next/navigation`, () => {
  const actual = vi.importActual(`next/navigation`);
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

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

vi.mock(`@/app/utils/api/createCompany`);
vi.mocked(createCompany).mockImplementation(async () => ({
  companyId: `mockId`,
}));

describe(`CreateCompany`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it(`When trying to send form without filling the company name input, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(`O Nome do restaurante é obrigatório.`)
    ).toBeInTheDocument();
  });

  it(`When trying to send form without filling the CNPJ/CPF input, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const companyNameInput = screen.getByLabelText(`Nome do restaurante*`);

    await userEvent.type(companyNameInput, `restaurante`);
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(`O CNPJ/CPF é obrigatório e deve ser válido.`)
    ).toBeInTheDocument();
  });

  it(`When trying to send form filling a wrong CNPJ/CPF, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const companyNameInput = screen.getByLabelText(`Nome do restaurante*`);

    await userEvent.type(companyNameInput, `restaurante`);

    const cnpjInput = screen.getByLabelText(`CNPJ/CPF*`);

    await userEvent.type(cnpjInput, `123456789123`);

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(`O CNPJ/CPF é obrigatório e deve ser válido.`)
    ).toBeInTheDocument();
  });

  it(`When trying to send form without filling the phone number input, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const companyNameInput = screen.getByLabelText(`Nome do restaurante*`);

    await userEvent.type(companyNameInput, `restaurante`);

    const cnpjInput = screen.getByLabelText(`CNPJ/CPF*`);

    await userEvent.type(cnpjInput, `12345678912`);

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(`O Telefone é obrigatório.`)
    ).toBeInTheDocument();
  });

  it(`When trying to send form filling a wrong phone number, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const phoneNumberInput = screen.getByLabelText(`Telefone*`);

    await userEvent.type(phoneNumberInput, `219999999999`);

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(`O número de telefone deve ser válido.`)
    ).toBeInTheDocument();
  });

  it(`When trying to send form filling a wrong delivery phone number, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const deliveryPhoneNumberInput =
      screen.getByLabelText(`Telefone de delivery`);

    await userEvent.type(deliveryPhoneNumberInput, `219999999999`);

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(
        `O número de telefone deve ser válido ou estar vázio.`
      )
    ).toBeInTheDocument();
  });

  it(`When trying to send form without logo image, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const companyNameInput = screen.getByLabelText(`Nome do restaurante*`);

    await userEvent.type(companyNameInput, `restaurante`);

    const cnpjInput = screen.getByLabelText(`CNPJ/CPF*`);

    await userEvent.type(cnpjInput, `12345678912`);

    const phoneNumberInput = screen.getByLabelText(`Telefone*`);

    await userEvent.type(phoneNumberInput, `21999999999`);

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(`A logo é obrigatória.`)
    ).toBeInTheDocument();
  });

  it(`When trying to send form without filling the zipCode input, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const companyNameInput = screen.getByLabelText(`Nome do restaurante*`);

    await userEvent.type(companyNameInput, `restaurante`);

    const cnpjInput = screen.getByLabelText(`CNPJ/CPF*`);

    await userEvent.type(cnpjInput, `12345678912`);

    const phoneNumberInput = screen.getByLabelText(`Telefone*`);

    await userEvent.type(phoneNumberInput, `21999999999`);

    await userEvent.click(submitButton);

    expect(await screen.findByText(`O CEP é obrigatório.`)).toBeInTheDocument();
  });

  it(`When trying to send form filling a wrong zipCode, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const zipCodeInput = screen.getByLabelText(`CEP*`);

    await userEvent.type(zipCodeInput, `999999999`);

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(`Digite um CEP válido.`)
    ).toBeInTheDocument();
  });

  it(`When trying to send form without filling the address input, should render error`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const companyNameInput = screen.getByLabelText(`Nome do restaurante*`);

    await userEvent.type(companyNameInput, `restaurante`);

    const cnpjInput = screen.getByLabelText(`CNPJ/CPF*`);

    await userEvent.type(cnpjInput, `12345678912`);

    const phoneNumberInput = screen.getByLabelText(`Telefone*`);

    await userEvent.type(phoneNumberInput, `21999999999`);

    const zipCodeInput = screen.getByLabelText(`CEP*`);

    await userEvent.type(zipCodeInput, `99999999`);

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(`O Endereço é obrigatório.`)
    ).toBeInTheDocument();
  });

  it(`When trying to send form filling all inputs correctly, createCompany func should have been called 1 time`, async () => {
    render(<CreateCompany />);

    const submitButton = screen.getByRole(`button`, {
      name: `Finalizar cadastro`,
    });

    const companyNameInput = screen.getByLabelText(`Nome do restaurante*`);

    await userEvent.type(companyNameInput, `restaurante`);

    const cnpjInput = screen.getByLabelText(`CNPJ/CPF*`);

    await userEvent.type(cnpjInput, `12345678912`);

    const phoneNumberInput = screen.getByLabelText(`Telefone*`);

    await userEvent.type(phoneNumberInput, `21999999999`);

    const logoInput = screen.getByTestId(`logoInput`);

    const logoImageFile = createImageMock();

    await userEvent.upload(logoInput, logoImageFile);

    const coverCapeInput = screen.getByTestId(`coverCapeInput`);

    const coverCapeImageFile = createImageMock();

    await userEvent.upload(coverCapeInput, coverCapeImageFile);

    const zipCodeInput = screen.getByLabelText(`CEP*`);

    await userEvent.type(zipCodeInput, `99999999`);

    const addressInput = screen.getByLabelText(`Endereço*`);

    await userEvent.type(addressInput, `endereço`);

    await userEvent.click(submitButton);

    expect(createCompany).toHaveBeenCalledTimes(1);
  });
});
