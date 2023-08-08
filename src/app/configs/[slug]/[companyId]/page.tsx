import ManagementScreenHeader from '@/app/components/ManagementScreenHeader';
import MenuComponent from '@/app/components/MenuComponent';
import Teste from '@/app/components/Teste';
import api from '@/app/utils/api';
import { menuItens } from '@/app/utils/menuItems';
import { CompanyProps, RouterParams } from '@/app/utils/types';

import styles from './styles.module.css';

export default async function Configs({ params }: RouterParams) {
  const result = await api.get<CompanyProps>(
    `/company/getCompanyById?id=${params.companyId}`
  );

  const { name, info } = result.data.company;
  return (
    <div className={styles.configsContainer}>
      <ManagementScreenHeader
        companyLogoUrl={info.companyLogoUrl}
        companyName={name}
      />
      <main className={styles.configsMainContainer}>
        <MenuComponent menuInformations={menuItens} />
        <Teste />
        <button className={styles.configsSeeMyStoreButton} type="button">
          Como sua loja está hoje
        </button>
      </main>
    </div>
  );
}
