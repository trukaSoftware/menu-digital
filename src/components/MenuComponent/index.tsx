import { menuItens } from '@/utils/menuItems';

import CreateCategoryTrigger from '../Dialogs/CreateCategoryDialog/CreateCategoryTrigger';
import CreateComplementTrigger from '../Dialogs/CreateComplementsDialog/CreateComplementsTrigger';
import CreateProductTrigger from '../Dialogs/CreateProductDialog/CreateProductTrigger';
import CreateQrCodeTrigger from '../Dialogs/CreateQrCodeDialog/CreateQrCodeTrigger';
import styles from './styles.module.css';

export interface MenuComponentProps {
  menuTitle: string;
  companyInfos?: {
    slug: string;
    companyId: string;
  };
}

export default function MenuComponent({
  menuTitle,
  companyInfos,
}: MenuComponentProps) {
  return (
    <nav className={styles.menuComponentContainer}>
      <div className={styles.menuComponentWrapper}>
        <h2 className={styles.menuComponentTitle}>{menuTitle}</h2>
        <div className={styles.menuComponentContainerItems}>
          {companyInfos ? (
            menuItens.map((item) => (
              <a
                title={`${item.itemText}`}
                className={styles.menuComponentItem}
                href={`${item.managementPageHref}/${companyInfos.slug}/${companyInfos.companyId}`}
                key={`item-${Math.floor(new Date().valueOf() * Math.random())}`}
              >
                <div className={styles.menuComponentIconContainer}>
                  <item.menuIcon size={32} color="E5E7EB" />
                </div>
                <span className={styles.menuComponentItemText}>
                  {item.itemText}
                </span>
              </a>
            ))
          ) : (
            <div className={styles.menuComponentTrigger}>
              <CreateProductTrigger />
              <CreateCategoryTrigger />
              <CreateComplementTrigger />
              <CreateQrCodeTrigger />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
