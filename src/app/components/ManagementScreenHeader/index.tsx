import { SlArrowLeft } from 'react-icons/sl';

import Image from 'next/image';
import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';

import styles from './styles.module.css';

export type ManagementScreenHeaderProps = {
  companyLogoUrl: string;
  companyName: string;
  title?: string;
  hasBackButton?: boolean;
  backPage?: string;
};

export default function ManagementScreenHeader({
  companyLogoUrl,
  companyName,
  title,
  hasBackButton = false,
  backPage,
}: ManagementScreenHeaderProps) {
  return (
    <header
      data-testid="management-screen-header"
      className={
        hasBackButton
          ? styles.managementScreenHeaderWithRowReverse
          : styles.managementScreenHeader
      }
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

      {hasBackButton ? (
        <Link
          role="link"
          title="Voltar para página anterior"
          href={backPage || ``}
        >
          <SlArrowLeft size="32" color="DC2626" />
        </Link>
      ) : (
        <UserButton afterSignOutUrl="/sign-in" />
      )}
    </header>
  );
}
