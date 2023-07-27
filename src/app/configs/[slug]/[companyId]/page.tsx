import ManagementScreenHeader from '@/app/components/ManagementScreenHeader';
import api from '@/app/utils/api';
import { CompanyProps, RouterParams } from '@/app/utils/types';

import styles from './styles.module.css';

export default async function Configs({ params }: RouterParams) {
  const result = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${params.companyId}`
  );

  const { name, info } = result.data.company;
  return (
    <div className={styles.configsContainer}>
      <ManagementScreenHeader
        companyLogoUrl={info.companyLogoUrl}
        companyName={name}
      />
    </div>
  );
}
