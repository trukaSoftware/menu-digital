import ShoppingCartDialog from '@/components/Dialogs/ShoppingCartDialog';
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

  const {
    companyLogoUrl,
    companyThemeUrl,
    deliveryPhoneNumber,
    deliveryTax,
    deliveryTime,
    address: { address },
  } = info;

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
            complements:
              product.productsComplements.length > 0
                ? product.productsComplements
                : [],
          } as FoodCardProps)
      ),
    }));

  const companyCategories = categories
    .filter((category) => category.categoryProducts.length > 0)
    .map((category) => category.name);

  const companyData = {
    deliveryPhoneNumber,
    name,
    deliveryTax,
    deliveryTime,
    address,
  };

  return (
    <div className={styles.container}>
      <div>
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
      </div>
      <div className={styles.containerShoppingCartDialog}>
        <ShoppingCartDialog companyData={companyData} />
      </div>
    </div>
  );
}
