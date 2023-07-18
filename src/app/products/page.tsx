import {
  mockFoodCard,
  mockFoodCardWithoutDiscount,
} from '../components/FoodCard/mocks';
import FoodCardList from '../components/FoodCardList';
import Header from '../components/Header';
import styles from './styles.module.css';

const mockFoodCardList = [
  mockFoodCard,
  mockFoodCardWithoutDiscount,
  mockFoodCard,
  mockFoodCard,
  mockFoodCardWithoutDiscount,
  mockFoodCard,
];

export default function Products() {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <FoodCardList title="Mais vendidos" foodCards={mockFoodCardList} />
        <FoodCardList title="Hamburguers" foodCards={mockFoodCardList} />
      </main>
    </>
  );
}
