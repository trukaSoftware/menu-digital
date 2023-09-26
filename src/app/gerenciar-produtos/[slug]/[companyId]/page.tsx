import CreateFormTrigger from '@/components/Dialogs/CreateFormDialog/CreateFormTrigger';
import ManagementScreenHeader from '@/components/ManagementScreenHeader';
import ProductsPreLoader from '@/components/PreLoaders/ProductsPreLoader';
import ProductsWithSearchInput from '@/components/ProductsWithSearchInput';

import api from '@/utils/api';
import { getProducts } from '@/utils/api/getProducts';
import { CompanyProps, RouterParams } from '@/utils/types';

import styles from './styles.module.css';

export const fetchCache = `force-no-store`;
export const dynamic = `force-dynamic`;
export const revalidate = 0;

export default async function ManageProducts({ params }: RouterParams) {
  const { companyId } = params;

  const companyResults = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${companyId}`
  );

  const { name, info } = companyResults.data.company;

  const { companyLogoUrl } = info;

  const { products } = await getProducts(companyId);

  return (
    <div className={styles.manageProductsWrapper}>
      <ManagementScreenHeader
        companyLogoUrl={companyLogoUrl}
        companyName={name}
        backPage="/"
        title="Produtos"
      />
      <ProductsPreLoader products={products} />

      <CreateFormTrigger title="Produtos" formType="product-form" />
      <ProductsWithSearchInput />
    </div>
  );
}
