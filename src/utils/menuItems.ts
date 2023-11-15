import { FaGripLines, FaShoppingBasket, FaListUl } from 'react-icons/fa';

export const menuItens = [
  {
    menuIcon: FaShoppingBasket,
    itemText: `Produtos`,
    managementPageHref: `/gerenciar-produtos`,
  },
  {
    menuIcon: FaGripLines,
    itemText: `Categorias`,
    managementPageHref: `/gerenciar-categorias`,
  },
  {
    menuIcon: FaListUl,
    itemText: `Adicionais`,
    managementPageHref: `/gerenciar-adicionais`,
  },
];
