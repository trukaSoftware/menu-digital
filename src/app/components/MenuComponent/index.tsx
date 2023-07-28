import { IconType } from 'react-icons';

import DefaultDialog from '../DefaultDialog';
import styles from './styles.module.css';

interface MenuComponentProps {
  menuInformations: {
    menuTitle: string;
    items: {
      menuIcon: IconType;
      itemText: string;
      DialogBody: React.FunctionComponent;
    }[];
  }[];
}

export default function MenuComponent({
  menuInformations,
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
            {menuInformation.items.map((item) => (
              <DefaultDialog key={item.itemText}>
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
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
