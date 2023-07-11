import { FoodCardProps } from '..';

export const mockFoodCard = {
  title: `Nome do Produto`,
  description: `Descrição do produto`,
  foodImage: `/images/food-image.svg`,
  price: 10,
  discountedPrice: 8,
  discountPercentage: 20,
} as FoodCardProps;

export const mockFoodCardWithoutDiscount = {
  title: `Nome do Produto`,
  description: `Descrição do produto`,
  foodImage: `/images/food-image.svg`,
  price: 10,
} as FoodCardProps;
