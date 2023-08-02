import { IconBaseProps } from 'react-icons';
import { CgSpinner } from 'react-icons/cg';

import styles from './styles.module.css';

export default function Spinner({ ...rest }: IconBaseProps) {
  return <CgSpinner className={styles.spinner} {...rest} />;
}
