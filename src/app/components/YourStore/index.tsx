import { Product } from '@/types/product';

import EditableFoodCard from '../EditableFoodCard';
import styles from './styles.module.css';

export interface YourStoreProps {
  products: Product[];
}

export default function YourStore({ products }: YourStoreProps) {
  return (
    <section className={styles.yourStoreProductsList}>
      {products.map((product) => (
        <EditableFoodCard
          description={product.description}
          foodImage={product?.productsImages[0].imageUrl}
          price={+product.price}
          title={product.name}
          id={product.id}
          key={product.id}
        />
      ))}
    </section>
  );
}
