import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from '../styles/loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <AiOutlineLoading3Quarters size={32} className={styles.loadingIcon} />
    </div>
  );
}
