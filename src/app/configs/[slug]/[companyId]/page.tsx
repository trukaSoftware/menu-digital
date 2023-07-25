'use client';

import { UserButton } from '@clerk/nextjs';

import styles from './styles.module.css';

type ConfigData = {
  params: {
    slug: string;
    companyId: string;
  };
};

export default function Configs({ params }: ConfigData) {
  // params can be used to handle company tenant informations
  return (
    <div className={styles.configsContainer}>
      <h1 className={styles.configsTitle}>Configs</h1>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
