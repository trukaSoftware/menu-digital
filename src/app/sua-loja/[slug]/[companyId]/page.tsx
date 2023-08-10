import ManagementScreenHeader from '@/app/components/ManagementScreenHeader';
import YourStore from '@/app/components/YourStore';
import api from '@/app/utils/api';
import { getProducts } from '@/app/utils/api/getProducts';
import { CompanyProps, RouterParams } from '@/app/utils/types';

import styles from './styles.module.css';

export default async function Page({ params }: RouterParams) {
  const result = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${params.companyId}`
  );

  const { name, info } = result.data.company;

  const { products } = await getProducts();

  return (
    <div>
      <ManagementScreenHeader
        companyLogoUrl={info.companyLogoUrl}
        companyName={name}
        hasBackButton
        title="Sua loja"
      />
      <main className={styles.yourStoreContent}>
        <YourStore products={products} />
      </main>
    </div>
  );
}
