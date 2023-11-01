'use client';

import { useEffect, useState } from 'react';

import { Complement } from '@/types/complement';

import { getComplements } from '@/utils/api/getComplements';
import { removeAccent } from '@/utils/removeAccent';

import ComplementEmptyState from '../ComplementEmptyState';
import DropdownComplement from '../DropdownComplement';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

export default function ComplementWithSearchInput() {
  const [searchInputValue, setSearchInputValue] = useState(``);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [allComplements, setAllComplements] = useState<Complement[]>([]);
  const [search, setSearch] = useState(``);

  useEffect(() => {
    const getAllComplements = async () => {
      const allComplement = await getComplements();
      setAllComplements(allComplement.complements);
    };
    getAllComplements();
  }, []);

  const filteredComplements =
    allComplements.length > 0
      ? allComplements.filter((complement) =>
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
          filteredComplements.map((complements, index) => (
            <DropdownComplement
              key={complements.id}
              complements={complements}
              filteredItems={complements.items}
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
