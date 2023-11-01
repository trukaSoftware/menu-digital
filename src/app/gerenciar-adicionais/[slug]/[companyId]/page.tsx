import ComplementsWithSearchInput from '@/components/ComplementWithSearchInput';
import CreateFormTrigger from '@/components/Dialogs/CreateFormDialog/CreateFormTrigger';
import ManagementScreenHeader from '@/components/ManagementScreenHeader';

import api from '@/utils/api';
import { RouterParams, CompanyProps } from '@/utils/types';

import styles from './styles.module.css';

export default async function ManageCategories({ params }: RouterParams) {
  const { companyId } = params;

  const companyResults = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${companyId}`
  );

  const { name, info } = companyResults.data.company;

  const { companyLogoUrl } = info;

  return (
    <div className={styles.manageComplementsWrapper}>
      <ManagementScreenHeader
        companyLogoUrl={companyLogoUrl}
        companyName={name}
        backPage="/"
        title="Adicionais"
      />

      <CreateFormTrigger title="Adicionais" formType="complement-form" />
      <ComplementsWithSearchInput />
    </div>
  );
}
