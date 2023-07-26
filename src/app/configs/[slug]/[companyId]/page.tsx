'use client';

import { RouterParams } from '@/app/utils/types';
import { UserButton } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function Configs({ params }: RouterParams) {
  // params can be used to handle company tenant informations
  return (
    <div className={styles.configsContainer}>
      <h1 className={styles.configsTitle}>Configs</h1>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
