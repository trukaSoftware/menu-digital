'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaAddressCard,
  FaRegBuilding,
  FaPhoneAlt,
  FaPhoneVolume,
  FaFileUpload,
  FaMapMarkerAlt,
  FaMapPin,
  FaImage,
} from 'react-icons/fa';

import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';

import FormInput from '../components/FormInput';
import UploadImageInput from '../components/UploadImageInput';
import { convertFileToBase64 } from '../utils/convertFileToBase64';
import {
  formatPhoneNumber,
  formatZipCode,
  formatCnpj,
  formatCpf,
} from '../utils/formatCreateCompanyForm';
import { CreateCompanyData } from '../utils/types';
import { createCompanyFormValidation } from '../yup/createCompanyFormValidation';
import styles from './styles.module.css';

export default function CreateCompany() {
  const { user } = useUser();
  const [selectedLogo, setSelectedLogo] = useState(``);
  const [selectedCoverCape, setSelectedCoverCape] = useState(``);
  const [selectedLogoName, setSelectedLogoName] = useState(``);
  const [selectedCoverCapeName, setSelectedCoverCapeName] = useState(``);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCompanyFormValidation),
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFileName: Dispatch<SetStateAction<string>>,
    setFile: Dispatch<SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    setFileName(String(file?.name));
    const fileToBase64 = await convertFileToBase64(file);
    setFile(String(fileToBase64));
  };

  const email = user?.emailAddresses[0].emailAddress;

  const submit = (data: CreateCompanyData) => {
    const { cnpj, phoneNumber, deliveryPhoneNumber, zipCode } = data;
    const formatedForm = {
      ...data,
      id: user?.id,
      cnpj: cnpj?.length === 14 ? formatCnpj(cnpj) : formatCpf(`${cnpj}`),
      phoneNumber: formatPhoneNumber(phoneNumber),
      deliveryPhoneNumber: !deliveryPhoneNumber
        ? formatPhoneNumber(phoneNumber)
        : formatPhoneNumber(deliveryPhoneNumber),
      zipcode: formatZipCode(zipCode),
      email,
      companyLogo: {
        file: selectedLogo,
      },
      companyTheme: {
        file: selectedCoverCape,
      },
    };
    return console.log(formatedForm);
  };

  return (
    <>
      <div className={styles.companyHeader}>
        <h1 className={styles.companyTitle}>Vamos criar seu restaurante?</h1>
      </div>
      <div className={styles.companyMain}>
        <form onSubmit={handleSubmit(submit)}>
          <div className={styles.companyForm}>
            <FormInput
              id="name"
              iconImage={<FaAddressCard />}
              title="Nome do restaurante*"
              errorMessage={errors.name?.message}
              type="text"
              placeHolder="Nome do restaurante"
              register={register(`name`)}
            />
            <FormInput
              id="cnpj"
              iconImage={<FaRegBuilding />}
              title="CNPJ/CPF*"
              type="number"
              placeHolder="Apenas números"
              errorMessage={errors.cnpj?.message}
              register={register(`cnpj`)}
            />
            <FormInput
              id="phoneNumber"
              iconImage={<FaPhoneAlt />}
              title="Telefone*"
              type="number"
              placeHolder="Apenas números, com DDD"
              errorMessage={errors.phoneNumber?.message}
              register={register(`phoneNumber`)}
            />
            <FormInput
              id="deliveryPhoneNumber"
              iconImage={<FaPhoneVolume />}
              title="Telefone de delivery"
              type="number"
              placeHolder="Apenas números, com DDD"
              errorMessage={errors.deliveryPhoneNumber?.message}
              register={register(`deliveryPhoneNumber`)}
            />
            <p className={styles.companyInformationText}>
              **Caso não seja passado, usaremos o telefone
            </p>
            <div className={styles.companyImageInputWrapper}>
              <UploadImageInput
                style={
                  selectedLogo !== ``
                    ? styles.labelInputChecked
                    : styles.labelInput
                }
                id="logo"
                title={selectedLogoName ? `Logo:` : `Logo`}
                handleFileChange={(event) =>
                  handleFileChange(event, setSelectedLogoName, setSelectedLogo)
                }
                iconImage={<FaFileUpload />}
                imageName={selectedLogoName}
              />
              <UploadImageInput
                style={
                  selectedCoverCape !== ``
                    ? styles.labelInputChecked
                    : styles.labelInput
                }
                id="coverCape"
                title={selectedCoverCapeName ? `Capa:` : `Capa`}
                handleFileChange={(event) =>
                  handleFileChange(
                    event,
                    setSelectedCoverCapeName,
                    setSelectedCoverCape
                  )
                }
                iconImage={<FaImage />}
                imageName={selectedCoverCapeName}
              />
            </div>
            <FormInput
              id="zipCode"
              iconImage={<FaMapPin />}
              title="CEP*"
              type="number"
              placeHolder="Apenas números"
              errorMessage={errors.zipCode?.message}
              register={register(`zipCode`)}
            />
            <FormInput
              id="address"
              iconImage={<FaMapMarkerAlt />}
              title="Endereço*"
              type="text"
              placeHolder="Ex: Rua 1, nº 1, casa 1 - Bairro luz"
              errorMessage={errors.address?.message}
              register={register(`address`)}
            />
          </div>
          <button type="submit" className={styles.companySubmitButton}>
            Finalizar cadastro
          </button>
        </form>
      </div>
    </>
  );
}
