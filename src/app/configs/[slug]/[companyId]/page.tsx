import Link from 'next/link';

import ManagementScreenHeader from '@/components/ManagementScreenHeader';
import MenuComponent from '@/components/MenuComponent';

import api from '@/utils/api';
import { CompanyProps, RouterParams } from '@/utils/types';

import styles from './styles.module.css';

export default async function Configs({ params }: RouterParams) {
  const { slug, companyId } = params;

  const result = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${companyId}`
  );

  const { name, info } = result.data.company;

  return (
    <div className={styles.configsContainer}>
      <ManagementScreenHeader
        companyLogoUrl={info.companyLogoUrl}
        companyName={name}
      />
      <main className={styles.configsMainContainer}>
        <div className={styles.configsMainMenuContainer}>
          <MenuComponent menuTitle="Criar novo(a)" />
          <MenuComponent
            menuTitle="Gerenciar"
            companyInfos={{ slug, companyId }}
          />
        </div>

        <Link
          href={`sua-loja/${slug}/${companyId}`}
          className={styles.configsSeeMyStoreButton}
        >
          Como sua loja está hoje
        </Link>
      </main>
    </div>
  );
}
