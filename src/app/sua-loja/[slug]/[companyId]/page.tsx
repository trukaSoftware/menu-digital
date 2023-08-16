import ManagementScreenHeader from '@/app/components/ManagementScreenHeader';
import YourStore from '@/app/components/YourStore';
import api from '@/app/utils/api';
import { getCategories } from '@/app/utils/api/getCategories';
import { CompanyProps, RouterParams } from '@/app/utils/types';

import styles from './styles.module.css';

export default async function Page({ params }: RouterParams) {
  const result = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${params.companyId}`
  );

  const { name, info } = result.data.company;

  const { categories } = await getCategories(params.companyId);

  return (
    <div className={styles.yourStore}>
      <ManagementScreenHeader
        companyLogoUrl={info.companyLogoUrl}
        companyName={name}
        hasBackButton
        title="Sua loja"
      />
      <main className={styles.yourStoreContent}>
        <YourStore categories={categories} />
      </main>
    </div>
  );
}
