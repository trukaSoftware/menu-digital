'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSolidTimer, BiLogoInstagramAlt } from 'react-icons/bi';
import {
  FaPhoneAlt,
  FaPhoneVolume,
  FaFileUpload,
  FaMapMarkerAlt,
  FaMapPin,
  FaImage,
} from 'react-icons/fa';
import { IoMdTimer } from 'react-icons/io';
import { MdDeliveryDining } from 'react-icons/md';
import { toast } from 'react-toastify';

import axios from 'axios';

import { editCompany } from '@/utils/api/editCompany';
import { convertFileToBase64 } from '@/utils/convertFileToBase64';
import { EditCompanyInterface } from '@/utils/types';

import { mockedImage } from '@/mocks/imageMock';
import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  editCompanyFormSchema,
  editCompanyFormType,
} from '@yup/front/editCompanyFormSchema';

import ButtonSubmit from '../../ButtonSubmit';
import DefaultInput from '../../DefaultInput';
import UploadImageInput from '../../UploadImageInput';
import styles from './styles.module.css';

interface EditCompanyInfosProps {
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export default function EditCompanyInfos({
  setShowDialog,
}: EditCompanyInfosProps) {
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
    resolver: yupResolver(editCompanyFormSchema),
    defaultValues: async () => {
      const result = await axios.get(
        `/api/company/getCompanyById?id=${user?.id}`
      );

      return {
        deliveryTax: result?.data?.company?.info?.deliveryTax,
        deliveryTime: result?.data?.company?.info?.deliveryTime,
        openingHours: result?.data?.company?.info?.openingHours,
        instagramUrl: result?.data?.company?.info?.instagramUrl,
        phoneNumber: result?.data?.company?.info?.phoneNumber,
        fileLogo: result?.data?.company?.info?.companyLogoUrl,
        fileCoverCape: result?.data?.company?.info?.companyThemeUrl,
        deliveryPhoneNumber: result?.data?.company?.info?.deliveryPhoneNumber,
        zipCode: result?.data?.company?.info?.address?.zipCode,
        address: result?.data?.company?.info?.address?.address,
      } as editCompanyFormType;
    },
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

  const submit = async (data: EditCompanyInterface) => {
    setIsSubmiting(true);

    try {
      const createdCompany = await editCompany({
        ...data,
        id: `${user?.id}`,
        company: undefined,
        companyInfo: {
          deliveryTax: data.deliveryTax || undefined,
          deliveryTime: data.deliveryTime || undefined,
          openingHours: data.openingHours || undefined,
          instagramUrl: data.instagramUrl || undefined,
          phoneNumber: data.phoneNumber || undefined,
          deliveryPhoneNumber: data.deliveryPhoneNumber || undefined,
          companyLogo: selectedLogo
            ? {
                file: selectedLogo,
              }
            : undefined,
          companyTheme: selectedCoverCape
            ? {
                file: selectedCoverCape || mockedImage,
              }
            : undefined,
        },
        companyAddress: {
          zipCode: data.zipCode || undefined,
          address: data.address || undefined,
        },
      });
      if (!createdCompany?.company?.id) {
        setIsSubmiting(false);
        setShowDialog(false);
        return setRequestError(true);
      }

      toast.success(`Informações editadas com sucesso!`);
    } catch {
      setRequestError(true);
      toast.error(
        `Edição de informações falhou, tente novamente em instantes!`
      );
    } finally {
      setShowDialog(false);
      setIsSubmiting(false);
    }
  };

  return (
    <div className={styles.editCompanyWrapper}>
      <form onSubmit={handleSubmit(submit)} className={styles.editCompanyForm}>
        <div className={styles.editCompanyContainerInputs}>
          <DefaultInput
            labelClassName={styles.editCompanyLabel}
            Icon={<FaPhoneAlt size={20} color="#9ca3af" />}
            name="phoneNumber"
            labelText="Telefone*"
            error={errors.phoneNumber?.message}
            register={register(`phoneNumber`)}
            placeholder="Somente números, com DDD"
            type="number"
          />
          <DefaultInput
            labelClassName={`${styles.editCompanyLabel} ${styles.deliveryPhoneLabel}`}
            Icon={<FaPhoneVolume size={20} color="#9ca3af" />}
            name="deliveryPhoneNumber"
            labelText="Telefone de delivery"
            error={errors.deliveryPhoneNumber?.message}
            register={register(`deliveryPhoneNumber`)}
            placeholder="Somente números, com DDD"
            type="number"
          />
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
            labelClassName={styles.editCompanyLabel}
            Icon={<FaMapPin size={20} color="#9ca3af" />}
            name="zipCode"
            labelText="CEP*"
            error={errors.zipCode?.message}
            register={register(`zipCode`)}
            placeholder="Somente números"
            type="number"
          />
          <DefaultInput
            labelClassName={styles.editCompanyLabel}
            Icon={<FaMapMarkerAlt size={20} color="#9ca3af" />}
            name="address"
            labelText="Endereço*"
            error={errors.address?.message}
            register={register(`address`)}
            placeholder="Ex: Rua 1, nº 1, casa 1 - Bairro luz"
          />
          <DefaultInput
            labelClassName={styles.editCompanyLabel}
            Icon={<MdDeliveryDining size={20} color="#9ca3af" />}
            name="deliveryTax"
            labelText="taxa de entrega*"
            error={errors.deliveryTax?.message}
            register={register(`deliveryTax`)}
            placeholder="Ex: 3,50"
            type="number"
            step="0.01"
          />
          <DefaultInput
            labelClassName={styles.editCompanyLabel}
            Icon={<BiSolidTimer size={20} color="#9ca3af" />}
            name="deliveryTime"
            labelText="tempo de entrega*"
            error={errors.deliveryTime?.message}
            register={register(`deliveryTime`)}
            placeholder="Ex: Entre 30 e 40 minutos"
          />
          <DefaultInput
            labelClassName={styles.editCompanyLabel}
            Icon={<IoMdTimer size={20} color="#9ca3af" />}
            name="openingHours"
            labelText="Horário de funcionamento*"
            error={errors.openingHours?.message}
            register={register(`openingHours`)}
            placeholder="Ex: Das 18h as 23h"
          />
          <DefaultInput
            labelClassName={styles.editCompanyLabel}
            Icon={<BiLogoInstagramAlt size={20} color="#9ca3af" />}
            name="instagramUrl"
            labelText="Link do Instagram*"
            error={errors.instagramUrl?.message}
            register={register(`instagramUrl`)}
            placeholder="Ex: https://www.instagram.com/açai-do-bom/"
          />
        </div>
        <ButtonSubmit
          isSubmiting={isSubmiting}
          text="Finalizar edição"
          submitError={requestError}
          className={styles.companySubmitButton}
        />
      </form>
    </div>
  );
}
