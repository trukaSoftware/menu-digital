import Link from 'next/link';

import { menuItens } from '@/app/utils/menuItems';

import CreateCategoryTrigger from '../Dialogs/CreateCategoryDialog/CreateCategoryTrigger';
import CreateProductTrigger from '../Dialogs/CreateProductDialog/CreateProductTrigger';
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
              <Link
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
              </Link>
            ))
          ) : (
            <>
              <CreateProductTrigger />
              <CreateCategoryTrigger />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
