'use client';

import { useRouter } from 'next/navigation';

import { UserButton, useAuth } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function Configs() {
  const router = useRouter();
  const { userId } = useAuth();

  if (!userId) {
    router.push(`/sign-in`);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Configs</h1>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
