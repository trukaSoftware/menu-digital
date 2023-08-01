import { IconType } from 'react-icons';

import Link from 'next/link';

import DefaultDialog from '../DefaultDialog';
import styles from './styles.module.css';

export interface MenuComponentProps {
  menuInformations: {
    menuTitle: string;
    items: {
      menuIcon: IconType;
      dialogHeadLineText?: string;
      itemText: string;
      DialogBody?: React.FunctionComponent;
      managementPageHref?: string;
    }[];
  }[];
  companyInfos: {
    slug: string;
    companyId: string;
  };
}

export default function MenuComponent({
  menuInformations,
  companyInfos,
}: MenuComponentProps) {
  return (
    <nav className={styles.menuComponentContainer}>
      {menuInformations.map((menuInformation) => (
        <div
          className={styles.menuComponentWrapper}
          key={menuInformation.menuTitle}
        >
          <h2 className={styles.menuComponentTitle}>
            {menuInformation.menuTitle}
          </h2>
          <div className={styles.menuComponentContainerItems}>
            {menuInformation.items.map((item) =>
              item.DialogBody ? (
                <DefaultDialog
                  key={item.itemText}
                  dialogHeadLineText={item.dialogHeadLineText || ``}
                >
                  {[
                    <button
                      className={styles.menuComponentItem}
                      type="button"
                      key={`button-${item.itemText}`}
                    >
                      <div className={styles.menuComponentIconContainer}>
                        <item.menuIcon size={32} color="E5E7EB" />
                      </div>
                      <span className={styles.menuComponentItemText}>
                        {item.itemText}
                      </span>
                    </button>,
                    <item.DialogBody key={`dialogBody-${item.itemText}`} />,
                  ]}
                </DefaultDialog>
              ) : (
                <Link
                  className={styles.menuComponentItem}
                  href={`${item.managementPageHref}/${companyInfos.slug}/${companyInfos.companyId}`}
                  key={`button-${item.itemText}`}
                >
                  <div className={styles.menuComponentIconContainer}>
                    <item.menuIcon size={32} color="E5E7EB" />
                  </div>
                  <span className={styles.menuComponentItemText}>
                    {item.itemText}
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}
