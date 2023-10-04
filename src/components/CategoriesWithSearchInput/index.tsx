'use client';

import { useState } from 'react';

import { removeAccent } from '@/utils/removeAccent';

import { useAppSelector } from '@/redux/store';

import Dropdown from '../Dropdown';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

export default function CategoriesWithSearchInput() {
  const [searchInputValue, setSearchInputValue] = useState(``);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [search, setSearch] = useState(``);
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const products = useAppSelector((state) => state.productsReducer.products);

  const filteredCategories =
    categories.length > 0
      ? categories.filter((category) =>
          removeAccent(category.name.toLowerCase())?.includes(
            removeAccent(searchInputValue?.toLowerCase())
          )
        )
      : [];

  const toggleDropdown = (index: number) => {
    if (showDropdown === index) {
      return setShowDropdown(null);
    }
    setSearch(``);
    setShowDropdown(index);
  };

  return (
    <div className={styles.categoriesWithSearchInputContainer}>
      <SearchInput
        id="search-categories"
        placeholder="Pesquisar categoria por nome..."
        onChange={(e) => setSearchInputValue(e.target.value.toLowerCase())}
        value={searchInputValue}
      />
      <div className={styles.categoriesWithSearchInputContainerProducts}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <Dropdown
              key={category.id}
              category={category}
              filteredProducts={products}
              currentCategoryIndex={index}
              gettingProducts={false}
              showDropdown={showDropdown}
              search={search}
              setSearch={setSearch}
              toggleDropdown={toggleDropdown}
            />
          ))
        ) : (
          <p>Não existem categorias cadastradas</p>
        )}
      </div>
    </div>
  );
}
