import { UserButton } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function Configs() {
  return (
    <div className={styles.configsContainer}>
      <h1 className={styles.configsTitle}>Configs</h1>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
