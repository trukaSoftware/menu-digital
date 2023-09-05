import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { GetCategoryReturn } from '@/types/category';

import EditableCategoryTitle from '../EditableCategoryTitle';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

export interface DropdownProps {
  removeCategoryFromList: (categoryId: string) => void;
  categories: GetCategoryReturn[];
}

const mockTeste = [
  {
    name: `Mais vendidos`,
    id: `1`,
    categoryProducts: [`Kiut`, `Hamburguer`, `Batata frita`],
  },
  {
    name: `Comidas`,
    id: `2`,
    categoryProducts: [
      `Kiut`,
      `Hamburguer`,
      `Batata frita`,
      `Barata corada`,
      `Batata rostie`,
    ],
  },
  {
    name: `Bebidas`,
    id: `3`,
    categoryProducts: [`Kiut`, `Hamburguer`, `Batata frita`],
  },
];

export default function Dropdown({ removeCategoryFromList }: DropdownProps) {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [search, setSearch] = useState(``);

  const toggleDropdown = (index: number) => {
    if (showDropdown === index) {
      return setShowDropdown(null);
    }
    setShowDropdown(index);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value.toLocaleLowerCase());
  };

  return (
    <>
      {mockTeste.map((category, index) => (
        <div key={category.id} className={styles.dropdownWrapper}>
          <label htmlFor={category.name}>
            <input
              type="checkbox"
              id={category.name}
              className={styles.dropdownCheckbox}
              onClick={() => toggleDropdown(index)}
            />
            <div className={styles.dropdownCategoryWrapper}>
              <div className={styles.dropdownCategoryImageWrapper}>
                <div className={styles.dropdownCategoryImage}>
                  {showDropdown === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <h2 className={styles.dropdownCategoryName}>{category.name}</h2>
              </div>
              <EditableCategoryTitle
                categoryId={category.id}
                removeCategoryFromList={removeCategoryFromList}
              />
            </div>
          </label>
          <div
            className={
              showDropdown === index
                ? styles.dropdownCategoryContent
                : styles.dropdownCategoryContentHidden
            }
          >
            <SearchInput
              id={String(index)}
              placeholder="Pesquisar produto por nome..."
              onChange={handleSearch}
            />
            {(search
              ? category.categoryProducts.filter((product) =>
                  product.toLocaleLowerCase().includes(search)
                )
              : category.categoryProducts
            ).map((product) => (
              <label htmlFor={product} key={product}>
                <input type="checkbox" name="" id={product} />
                <span className={styles.dropdownProductName}>{product}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
