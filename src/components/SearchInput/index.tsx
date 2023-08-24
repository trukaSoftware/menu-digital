import { FaSearch } from 'react-icons/fa';

import styles from './styles.module.css';

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export default function SearchInput({ id, ...rest }: SearchInputProps) {
  return (
    <label className={styles.searchInputWrapper} htmlFor={id}>
      <div className={styles.searchInputIcon}>
        <FaSearch />
      </div>
      <input className={styles.searchInput} id={id} {...rest} />
    </label>
  );
}
