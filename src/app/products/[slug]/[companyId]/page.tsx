import { RouterParams } from '@/utils/types';

import { foodCardMock, foodCardWithoutDiscountMock } from '@/mocks/foodCard';

import FoodCardList from '../../../../components/FoodCardList';
import Header from '../../../../components/Header';
import styles from './styles.module.css';

const mockFoodCardList = [
  foodCardMock,
  foodCardWithoutDiscountMock,
  foodCardMock,
  foodCardMock,
  foodCardWithoutDiscountMock,
  foodCardMock,
];

export default function Products({ params }: RouterParams) {
  // params can be used to handle company tenant informations
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
