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

import { useRouter } from 'next/navigation';

import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonSubmit from '../components/ButtonSubmit';
import DefaultInput from '../components/DefaultInput';
import UploadImageInput from '../components/UploadImageInput';
import { mockedImage } from '../mocks/imageMock';
import { createCompany } from '../utils/api/createCompany';
import { convertFileToBase64 } from '../utils/convertFileToBase64';
import { formatCnpj, formatCpf } from '../utils/formatCreateCompanyForm';
import { CreateCompanyData } from '../utils/types';
import { createCompanyFormValidation } from '../utils/yup/createCompanyFormValidation';
import styles from './styles.module.css';

export default function CreateCompany() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedLogo, setSelectedLogo] = useState(``);
  const [selectedCoverCape, setSelectedCoverCape] = useState(``);
  const [selectedLogoName, setSelectedLogoName] = useState(``);
  const [selectedCoverCapeName, setSelectedCoverCapeName] = useState(``);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [requestError, setRequestError] = useState(false);

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

  const submit = async (data: CreateCompanyData) => {
    setIsSubmiting(true);

    try {
      const createdCompany = await createCompany({
        ...data,
        id: user?.id,
        cnpj:
          data.cnpj.length === 14
            ? formatCnpj(data.cnpj)
            : formatCpf(data.cnpj),
        deliveryPhoneNumber: !data?.deliveryPhoneNumber
          ? data?.phoneNumber
          : data.deliveryPhoneNumber,
        email,
        companyLogo: {
          file: selectedLogo,
        },
        companyTheme: {
          file: selectedCoverCape || mockedImage,
        },
      });

      if (!createdCompany?.companyId) {
        setIsSubmiting(false);
        return setRequestError(true);
      }
      router.push(`/configs/${user?.publicMetadata.slug}/${user?.id}`);
    } catch {
      setRequestError(true);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <div className={styles.companyHeader}>
        <h1 className={styles.companyTitle}>Vamos criar seu restaurante?</h1>
      </div>
      <div className={styles.companyMain}>
        <form onSubmit={handleSubmit(submit)}>
          <div className={styles.companyForm}>
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<FaAddressCard size={20} color="#9ca3af" />}
              name="name"
              error={errors.name?.message}
              labelText="Nome do restaurante*"
              register={register(`name`)}
              placeholder="Nome do restaurante"
            />
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<FaRegBuilding size={20} color="#9ca3af" />}
              name="cnpj"
              error={errors.cnpj?.message}
              labelText="CNPJ/CPF*"
              register={register(`cnpj`)}
              placeholder="Somente números"
              type="number"
            />
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<FaPhoneAlt size={20} color="#9ca3af" />}
              name="phoneNumber"
              labelText="Telefone*"
              error={errors.phoneNumber?.message}
              register={register(`phoneNumber`)}
              placeholder="Somente números, com DDD"
              type="number"
            />
            <DefaultInput
              labelClassName={`${styles.createCompanyLabel} ${styles.deliveryPhoneLabel}`}
              Icon={<FaPhoneVolume size={20} color="#9ca3af" />}
              name="deliveryPhoneNumber"
              labelText="Telefone de delivery"
              error={errors.deliveryPhoneNumber?.message}
              register={register(`deliveryPhoneNumber`)}
              placeholder="Somente números, com DDD"
              type="number"
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
                testId="logoInput"
                title={selectedLogoName ? `Logo:` : `Logo`}
                handleFileChange={(event) =>
                  handleFileChange(event, setSelectedLogoName, setSelectedLogo)
                }
                iconImage={<FaFileUpload size={20} />}
                imageName={selectedLogoName}
              />
              <UploadImageInput
                style={
                  selectedCoverCape !== ``
                    ? styles.labelInputChecked
                    : styles.labelInput
                }
                id="coverCape"
                testId="coverCapeInput"
                title={selectedCoverCapeName ? `Capa:` : `Capa`}
                handleFileChange={(event) =>
                  handleFileChange(
                    event,
                    setSelectedCoverCapeName,
                    setSelectedCoverCape
                  )
                }
                iconImage={<FaImage size={20} />}
                imageName={selectedCoverCapeName}
              />
            </div>
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<FaMapPin size={20} color="#9ca3af" />}
              name="zipCode"
              labelText="CEP*"
              error={errors.zipCode?.message}
              register={register(`zipCode`)}
              placeholder="Somente números"
              type="number"
            />
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<FaMapMarkerAlt size={20} color="#9ca3af" />}
              name="address"
              labelText="Endereço*"
              error={errors.address?.message}
              register={register(`address`)}
              placeholder="Ex: Rua 1, nº 1, casa 1 - Bairro luz"
            />
          </div>
          <ButtonSubmit
            isSubmiting={isSubmiting}
            text="Finalizar cadastro"
            submitError={requestError}
            className={styles.companySubmitButton}
          />
        </form>
      </div>
    </>
  );
}
