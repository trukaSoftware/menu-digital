'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSolidTimer, BiLogoInstagramAlt } from 'react-icons/bi';
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
import { IoMdTimer } from 'react-icons/io';
import { MdDeliveryDining } from 'react-icons/md';

import { useRouter } from 'next/navigation';

import { createCompany } from '@/utils/api/createCompany';
import { convertFileToBase64 } from '@/utils/convertFileToBase64';
import { createSlug } from '@/utils/createSlug';
import { formatCnpj, formatCpf } from '@/utils/formatCreateCompanyForm';
import { CreateCompanyData } from '@/utils/types';

import { mockedImage } from '@/mocks/imageMock';
import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCompanyFormSchema } from '@yup/front/createCompanyFormSchema';

import ButtonSubmit from '../../components/ButtonSubmit';
import DefaultInput from '../../components/DefaultInput';
import UploadImageInput from '../../components/UploadImageInput';
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
  const [logoImageError, setLogoImageError] = useState(``);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCompanyFormSchema),
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFileName: Dispatch<SetStateAction<string>>,
    setFile: Dispatch<SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    setFileName(String(file?.name));
    const fileToBase64 = await convertFileToBase64(file, setLogoImageError);
    setFile(String(fileToBase64));
    setLogoImageError(``);
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

      router.push(
        `/configuracoes/${
          user?.publicMetadata.slug
            ? user?.publicMetadata.slug
            : createSlug(data.name)
        }/${user?.id}`
      );
    } catch {
      setRequestError(true);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className={styles.createCompanyWrapper}>
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
              Caso não seja passado, usaremos o telefone
            </p>
            <div className={styles.companyImageInputWrapper}>
              <UploadImageInput
                labelClassName={
                  selectedLogo !== `` ? styles.labelInputChecked : ``
                }
                id="logo"
                data-testid="logoInput"
                title={selectedLogoName ? `Logo:` : `Logo`}
                handleFileChange={(event) =>
                  handleFileChange(event, setSelectedLogoName, setSelectedLogo)
                }
                iconImage={<FaFileUpload size={20} />}
                imageName={selectedLogoName}
                error={logoImageError}
              />
              <UploadImageInput
                labelClassName={
                  selectedCoverCape !== `` ? styles.labelInputChecked : ``
                }
                id="coverCape"
                data-testid="coverCapeInput"
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
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<MdDeliveryDining size={20} color="#9ca3af" />}
              name="deliveryTax"
              labelText="taxa de entrega*"
              error={errors.deliveryTax?.message}
              register={register(`deliveryTax`)}
              placeholder="Ex: 3.50"
              type="number"
              step="0.01"
            />
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<BiSolidTimer size={20} color="#9ca3af" />}
              name="deliveryTime"
              labelText="tempo de entrega*"
              error={errors.deliveryTime?.message}
              register={register(`deliveryTime`, { required: false })}
              placeholder="Ex: Entre 30 e 40 minutos"
            />
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<IoMdTimer size={20} color="#9ca3af" />}
              name="openingHours"
              labelText="Horário de funcionamento*"
              error={errors.openingHours?.message}
              register={register(`openingHours`)}
              placeholder="Ex: Das 18h as 23h"
            />
            <DefaultInput
              labelClassName={styles.createCompanyLabel}
              Icon={<BiLogoInstagramAlt size={20} color="#9ca3af" />}
              name="instagramUrl"
              labelText="Link do Instagram"
              error={errors.instagramUrl?.message}
              register={register(`instagramUrl`)}
              placeholder="Ex: https://www.instagram.com/açai-do-bom/"
            />
          </div>
          <ButtonSubmit
            isSubmiting={isSubmiting}
            text="Finalizar cadastro"
            submitError={requestError}
            className={styles.companySubmitButton}
            onClick={() => {
              setLogoImageError(selectedLogo ? `` : `A logo é obrigatória.`);
            }}
          />
        </form>
      </div>
    </div>
  );
}
