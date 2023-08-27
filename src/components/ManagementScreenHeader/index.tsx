import { IoIosArrowBack } from 'react-icons/io';

import Image from 'next/image';
import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';

import styles from './styles.module.css';

export type ManagementScreenHeaderProps = {
  companyLogoUrl: string;
  companyName: string;
  title?: string;
  backPage?: string;
};

export default function ManagementScreenHeader({
  companyLogoUrl,
  companyName,
  title,
  backPage,
}: ManagementScreenHeaderProps) {
  return (
    <header
      data-testid="management-screen-header"
      className={styles.managementScreenHeaderWithRowReverse}
    >
      <Image
        className={styles.managementScreenHeaderLogo}
        src={companyLogoUrl}
        alt={`Imagem do estabelecimento ${companyName}`}
        width={44}
        height={44}
      />

      {title ? (
        <h1 className={styles.managementScreenHeaderTitle}>{title}</h1>
      ) : (
        <h1 className={styles.managementScreenHeaderTitle}>{companyName}</h1>
      )}

      {backPage ? (
        <Link
          role="link"
          title="Voltar para página anterior"
          href={backPage || ``}
        >
          <IoIosArrowBack size="32" color="DC2626" />
        </Link>
      ) : (
        <UserButton afterSignOutUrl="/sign-in" />
      )}
    </header>
  );
}
