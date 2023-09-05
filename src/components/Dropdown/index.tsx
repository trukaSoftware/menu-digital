import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import EditableCategoryTitle from '../EditableCategoryTitle';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

export interface DropdownProps {
  removeCategoryFromList: (categoryId: string) => void;
}

const mockTeste = [
  {
    categoryName: `Mais vendidos`,
    categoryId: `1`,
    products: [`Kiut`, `Hamburguer`, `Batata frita`],
  },
  {
    categoryName: `Comidas`,
    categoryId: `2`,
    products: [`Kiut`, `Hamburguer`, `Batata frita`],
  },
  {
    categoryName: `Bebidas`,
    categoryId: `3`,
    products: [`Kiut`, `Hamburguer`, `Batata frita`],
  },
];

export default function Dropdown({ removeCategoryFromList }: DropdownProps) {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    if (showDropdown === index) {
      return setShowDropdown(null);
    }
    setShowDropdown(index);
  };

  return (
    <div className={styles.dropdownWrapper}>
      {mockTeste.map((category, index) => (
        <>
          <label key={category.categoryId} htmlFor={category.categoryName}>
            <input
              type="checkbox"
              name=""
              id={category.categoryName}
              className={styles.dropdownCheckbox}
              onClick={() => toggleDropdown(index)}
            />
            <div className={styles.dropdownCategoryWrapper}>
              <div className={styles.dropdownCategoryImageWrapper}>
                <div className={styles.dropdownCategoryImage}>
                  {showDropdown === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <h2 className={styles.dropdownCategoryName}>
                  {category.categoryName}
                </h2>
              </div>
              <EditableCategoryTitle
                categoryId={category.categoryId}
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
            />
            {category.products.map((product) => (
              <label htmlFor={product} key={product}>
                <input type="checkbox" name="" id={product} />
                <span>{product}</span>
              </label>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
