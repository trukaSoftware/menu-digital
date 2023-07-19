import { FoodCardProps } from '../components/FoodCard';

export const foodCardMock = {
  title: `Nome do Produto`,
  description: `Descrição do produto`,
  foodImage: `/images/food-image.svg`,
  price: 10,
  discountedPrice: 8,
  discountPercentage: 20,
} as FoodCardProps;

export const foodCardWithoutDiscountMock = {
  title: `Nome do Produto`,
  description: `Descrição do produto`,
  foodImage: `/images/food-image.svg`,
  price: 10,
} as FoodCardProps;
