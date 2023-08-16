import { FaRegEdit } from 'react-icons/fa';

import { Root, Trigger } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export default function EditProductDialog() {
  return (
    <Root>
      <Trigger type="button" className={styles.editProductDialogTrigger}>
        <span>Editar</span>
        <FaRegEdit size={18} />
      </Trigger>
    </Root>
  );
}
