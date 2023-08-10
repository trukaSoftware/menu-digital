import { Trigger } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

interface MenuItemButtonProps {
  Icon: JSX.Element;
  itemText: string;
}

export default function MenuItemButton({
  Icon,
  itemText,
}: MenuItemButtonProps) {
  return (
    <Trigger className={styles.menuComponentItem}>
      <div className={styles.menuComponentIconContainer}>{Icon}</div>
      <span className={styles.menuComponentItemText}>{itemText}</span>
    </Trigger>
  );
}
