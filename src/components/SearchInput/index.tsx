import { FaSearch } from 'react-icons/fa';

import styles from './styles.module.css';

export type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchInput({ ...rest }: SearchInputProps) {
  return (
    <div className={styles.SearchInputWrapper}>
      <div className={styles.SearchInputIcon}>
        <FaSearch />
      </div>
      <input className={styles.SearchInput} {...rest} />
    </div>
  );
}
