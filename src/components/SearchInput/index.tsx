import { FaSearch } from 'react-icons/fa';

import styles from './styles.module.css';

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  uniqueId: string;
}

export default function SearchInput({ uniqueId, ...rest }: SearchInputProps) {
  return (
    <label className={styles.searchInputWrapper} htmlFor={uniqueId}>
      <div className={styles.searchInputIcon}>
        <FaSearch />
      </div>
      <input className={styles.searchInput} id={uniqueId} {...rest} />
    </label>
  );
}
