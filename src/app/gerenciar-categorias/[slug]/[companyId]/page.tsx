import CategoriesWithSearchInput from '@/components/CategoriesWithSearchInput';
import CreateFormTrigger from '@/components/Dialogs/CreateFormDialog/CreateFormTrigger';
import ManagementScreenHeader from '@/components/ManagementScreenHeader';
import CategoriesPreLoader from '@/components/PreLoaders/CategoriesPreLoader';
import ProductsPreLoader from '@/components/PreLoaders/ProductsPreLoader';

import api from '@/utils/api';
import { getCategories } from '@/utils/api/getCategories';
import { getProducts } from '@/utils/api/getProducts';
import { RouterParams, CompanyProps } from '@/utils/types';

import styles from './styles.module.css';

export default async function ManageCategories({ params }: RouterParams) {
  const { companyId } = params;

  const companyResults = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${companyId}`
  );

  const { name, info } = companyResults.data.company;

  const { companyLogoUrl } = info;

  const { categories } = await getCategories(params.companyId);
  const { products } = await getProducts(companyId);

  return (
    <div className={styles.manageCategoriesWrapper}>
      <CategoriesPreLoader categories={categories} />
      <ProductsPreLoader products={products} />
      <ManagementScreenHeader
        companyLogoUrl={companyLogoUrl}
        companyName={name}
        backPage="/"
        title="Categorias"
      />

      <CreateFormTrigger title="Categorias" formType="category-form" />
      <CategoriesWithSearchInput />
    </div>
  );
}
