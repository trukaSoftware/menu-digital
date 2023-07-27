import { FaShoppingBasket, FaGripLines } from 'react-icons/fa';

import styles from './styles.module.css';

export default function MenuComponent() {
  return (
    <nav className={styles.menuComponentContainer}>
      <div className={styles.menuComponentWrapper}>
        <h2 className={styles.menuComponentTitle}>Criar novo(a)</h2>
        <div className={styles.menuComponentContainerItems}>
          <button className={styles.menuComponentItem} type="button">
            <div className={styles.menuComponentIconContainer}>
              <FaShoppingBasket size={32} color="E5E7EB" />
            </div>
            <span className={styles.menuComponentItemText}>Produto</span>
          </button>
          <button className={styles.menuComponentItem} type="button">
            <div className={styles.menuComponentIconContainer}>
              <FaGripLines size={32} color="E5E7EB" />
            </div>
            <span className={styles.menuComponentItemText}>Categoria</span>
          </button>
        </div>
      </div>
      <div className={styles.menuComponentWrapper}>
        <h2 className={styles.menuComponentTitle}>Gerenciar</h2>
        <div className={styles.menuComponentContainerItems}>
          <button className={styles.menuComponentItem} type="button">
            <div className={styles.menuComponentIconContainer}>
              <FaShoppingBasket size={32} color="E5E7EB" />
            </div>
            <span className={styles.menuComponentItemText}>Produto</span>
          </button>
          <button className={styles.menuComponentItem} type="button">
            <div className={styles.menuComponentIconContainer}>
              <FaGripLines size={32} color="E5E7EB" />
            </div>
            <span className={styles.menuComponentItemText}>Categoria</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
