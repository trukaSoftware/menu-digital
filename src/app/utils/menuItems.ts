import { FaGripLines, FaShoppingBasket } from 'react-icons/fa';

import Header from '@/app/components/Header';

export const menuItens = [
  {
    menuTitle: `Criar novo(a)`,
    items: [
      {
        menuIcon: FaShoppingBasket,
        itemText: `Produtos`,
        DialogBody: Header, // o Header ta sendo passado aqui só por enquanto
      },
      {
        menuIcon: FaGripLines,
        itemText: `Categorias`,
        DialogBody: Header, // o Header ta sendo passado aqui só por enquanto
      },
    ],
  },
  {
    menuTitle: `Gerenciar`,
    items: [
      {
        menuIcon: FaShoppingBasket,
        itemText: `Produtos`,
        DialogBody: Header, // o Header ta sendo passado aqui só por enquanto
      },
      {
        menuIcon: FaGripLines,
        itemText: `Categorias`,
        DialogBody: Header, // o Header ta sendo passado aqui só por enquanto
      },
    ],
  },
];
