'use client';

import { useState } from 'react';

import { removeAccent } from '@/utils/removeAccent';

import { useAppSelector } from '@/redux/store';

import ComplementEmptyState from '../ComplementEmptyState';
import DropdownComplement from '../DropdownComplement';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

export default function ComplementWithSearchInput() {
  const [searchInputValue, setSearchInputValue] = useState(``);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [search, setSearch] = useState(``);
  const complements = useAppSelector(
    (state) => state.complementsReducer.complements
  );
  const items = useAppSelector((state) => state.itemsReducer.items);

  const filteredComplements =
    complements.length > 0
      ? complements.filter((complement) =>
          removeAccent(complement.name.toLowerCase())?.includes(
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
    <div className={styles.complementsWithSearchInputContainer}>
      <SearchInput
        id="search-complements"
        placeholder="Pesquisar adicional por nome..."
        onChange={(e) => setSearchInputValue(e.target.value.toLowerCase())}
        value={searchInputValue}
      />
      <div className={styles.complementsWithSearchInputContainerProducts}>
        {filteredComplements.length > 0 ? (
          filteredComplements.map((complementes, index) => (
            <DropdownComplement
              key={complementes.id}
              complements={complementes}
              filteredItems={items}
              currentComplementIndex={index}
              gettingProducts={false}
              showDropdown={showDropdown}
              search={search}
              setSearch={setSearch}
              toggleDropdown={toggleDropdown}
            />
          ))
        ) : (
          <ComplementEmptyState />
        )}
      </div>
    </div>
  );
}
