import { FoodCardProps } from '@/components/FoodCard';

import api from '@/utils/api';
import { getCategories } from '@/utils/api/getCategories';
import { CompanyProps, RouterParams } from '@/utils/types';

import FoodCardList from '../../../../components/FoodCardList';
import Header from '../../../../components/Header';
import styles from './styles.module.css';

export default async function Products({ params }: RouterParams) {
  const { categories } = await getCategories(params.companyId);

  const companyResults = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${params.companyId}`
  );

  const { name, info } = companyResults.data.company;

  const { companyLogoUrl, companyThemeUrl } = info;

  const parsedCategories = categories
    .filter((category) => category.categoryProducts.length > 0)
    .map((category) => ({
      ...category,
      categoryProducts: category.categoryProducts.map(
        (product) =>
          ({
            title: product.name,
            description: product.description,
            foodImage: product.productsImages[0].imageUrl,
            price: parseFloat(product.price),
            discountedPrice: product?.discount,
            discountPercentage: product.discount
              ? ((parseFloat(product.price) - product.discount) /
                  parseFloat(product.price)) *
                100
              : undefined,
          } as FoodCardProps)
      ),
    }));

  const companyCategories = categories
    .filter((category) => category.categoryProducts.length > 0)
    .map((category) => category.name);

  return (
    <>
      <Header
        companyName={name}
        companyImage={companyLogoUrl}
        companyThemeUrl={companyThemeUrl}
        companyCategories={companyCategories}
      />
      <main className={styles.mainContainer}>
        {parsedCategories.map((category) => (
          <FoodCardList
            key={category.id}
            title={category.name}
            foodCards={category.categoryProducts}
          />
        ))}
      </main>
    </>
  );
}
