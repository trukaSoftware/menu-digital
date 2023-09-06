import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { GetCategoryReturn } from '@/types/category';
import { Product } from '@/types/product';

import EditableCategoryTitle from '../EditableCategoryTitle';
import SearchProductsList from '../Forms/CreateCategoryForm/SearchProductsList';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

export interface DropdownProps {
  categories: GetCategoryReturn[];
  filteredProducts: Product[];
  register: UseFormRegisterReturn;
  gettingProducts: boolean;
}

export default function Dropdown({
  categories,
  filteredProducts,
  gettingProducts,
  register,
}: DropdownProps) {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [search, setSearch] = useState(``);

  const toggleDropdown = (index: number) => {
    if (showDropdown === index) {
      return setShowDropdown(null);
    }
    setSearch(``);
    setShowDropdown(index);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value.toLocaleLowerCase());
  };

  return (
    <>
      {categories.map((category, index) => (
        <div key={category.id} className={styles.dropdownWrapper}>
          <label htmlFor={category.name}>
            <input
              type="checkbox"
              id={category.name}
              className={styles.dropdownCheckbox}
              onClick={() => toggleDropdown(index)}
            />
            <div className={styles.dropdownCategoryImageWrapper}>
              <div className={styles.dropdownCategoryImage}>
                {showDropdown === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <EditableCategoryTitle
                categoryName={category.name}
                categoryId={category.id}
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
              value={search}
            />
            {showDropdown === index && search && (
              <SearchProductsList
                filteredProducts={filteredProducts.filter((product) =>
                  product.name.toLocaleLowerCase().includes(search)
                )}
                gettingProducts={gettingProducts}
                register={register}
              />
            )}
            {showDropdown === index && !search && (
              <SearchProductsList
                filteredProducts={filteredProducts}
                gettingProducts={gettingProducts}
                register={register}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
