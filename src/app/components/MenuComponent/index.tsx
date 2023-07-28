import { IconType } from 'react-icons';

import styles from './styles.module.css';

interface MenuComponentProps {
  menuInformations: {
    menuTitle: string;
    items: {
      menuIcon: IconType;
      itemText: string;
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
              <button
                key={item.itemText}
                className={styles.menuComponentItem}
                type="button"
              >
                <div className={styles.menuComponentIconContainer}>
                  <item.menuIcon size={32} color="E5E7EB" />
                </div>
                <span className={styles.menuComponentItemText}>
                  {item.itemText}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
