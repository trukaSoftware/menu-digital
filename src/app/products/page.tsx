import FoodCard, { FoodCardProps } from '../components/FoodCard';
import Header from '../components/Header';
import styles from './styles.module.css';

const mockFoodCard = {
  title: `Nome do Produto`,
  description: `Descrição do produto`,
  foodImage: `/images/food-image.svg`,
  price: 10,
  discountedPrice: 8,
  discountPercentage: 20,
} as FoodCardProps;

const mockFoodCard2 = {
  title: `Nome do Produto`,
  description: `Descrição do produto`,
  foodImage: `/images/food-image.svg`,
  price: 10,
} as FoodCardProps;

export default function Products() {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <FoodCard {...mockFoodCard} />
        <FoodCard {...mockFoodCard2} />
      </main>
    </>
  );
}
