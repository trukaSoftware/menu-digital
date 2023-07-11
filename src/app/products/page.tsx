import FoodCard from '../components/FoodCard';
import {
  mockFoodCard,
  mockFoodCardWithoutDiscount,
} from '../components/FoodCard/mocks';
import Header from '../components/Header';
import styles from './styles.module.css';

export default function Products() {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <FoodCard {...mockFoodCard} />
        <FoodCard {...mockFoodCardWithoutDiscount} />
      </main>
    </>
  );
}
