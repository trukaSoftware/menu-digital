import { SignUp } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function Page() {
  return (
    <div className={styles.containerSignUp}>
      <SignUp redirectUrl="/createCompany" />
    </div>
  );
}
