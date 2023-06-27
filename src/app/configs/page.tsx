import { UserButton } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function Configs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Configs</h1>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
