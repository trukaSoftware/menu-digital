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
      data-testid="manage-screen-header"
      className={
        hasBackButton
          ? styles.manageScreenHeaderWithRowReverse
          : styles.manageScreenHeader
      }
    >
      <Image
        className={styles.manageScreenHeaderLogo}
        src={companyLogoUrl}
        alt={`Imagem do estabelecimento ${companyName}`}
        width={44}
        height={44}
      />

      {title ? (
        <h1 className={styles.manageScreenHeaderTitle}>{title}</h1>
      ) : (
        <h1 className={styles.manageScreenHeaderTitle}>{companyName}</h1>
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
