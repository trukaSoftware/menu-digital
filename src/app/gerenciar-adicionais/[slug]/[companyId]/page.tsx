import ComplementsWithSearchInput from '@/components/ComplementWithSearchInput';
import CreateFormTrigger from '@/components/Dialogs/CreateFormDialog/CreateFormTrigger';
import ManagementScreenHeader from '@/components/ManagementScreenHeader';
import ComplementsPreLoader from '@/components/PreLoaders/ComplementsPreLoader';
import ItemsPreLoader from '@/components/PreLoaders/ItemsPreLoader';

import api from '@/utils/api';
import { getComplements } from '@/utils/api/getComplements';
import { getItems } from '@/utils/api/getItems';
import { RouterParams, CompanyProps } from '@/utils/types';

import styles from './styles.module.css';

export default async function ManageComplements({ params }: RouterParams) {
  const { companyId } = params;

  const companyResults = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${companyId}`
  );

  const { name, info } = companyResults.data.company;

  const { companyLogoUrl } = info;

  const { complements } = await getComplements(companyId);

  const { items } = await getItems(companyId);

  return (
    <div className={styles.manageComplementsWrapper}>
      <ItemsPreLoader items={items} />
      <ComplementsPreLoader complements={complements} />
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
