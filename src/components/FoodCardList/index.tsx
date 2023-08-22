import { FoodCardProps } from '../FoodCard';
import FoodCardDialog from '../FoodCardDialog';
import styles from './styles.module.css';

export interface FoodCardListProps {
  title: string;
  foodCards: FoodCardProps[];
}

export default function FoodCardList({ title, foodCards }: FoodCardListProps) {
  return (
    <section className={styles.foodCardList}>
      <h2 className={styles.foodCardListTitle}>{title}</h2>
      <div className={styles.foodCardListFoods}>
        {foodCards?.map((food) => (
          <FoodCardDialog foodCard={food} key={food.title} />
        ))}
      </div>
    </section>
  );
}
