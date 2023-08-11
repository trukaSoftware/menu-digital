import { Overlay } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export default function DefaultOverlay() {
  return <Overlay className={styles.defaultOverlay} />;
}
