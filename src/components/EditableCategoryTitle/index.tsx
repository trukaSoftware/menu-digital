import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

import styles from './styles.module.css';

export interface EditableCategoryTitleProps {
  categoryName: string;
}

export default function EditableCategoryTitle({
  categoryName,
}: EditableCategoryTitleProps) {
  return (
    <div className={styles.editableCategoryTitleContent}>
      <h2 className={styles.editableCategoryTitle}>{categoryName}</h2>
      <div className={styles.editableCategoryTitleButtonsWrapper}>
        <button
          type="button"
          className={styles.editableCategoryTitleDeleteButton}
        >
          <FaRegTrashAlt size={18} />
        </button>
        <button type="button">
          <FaRegEdit size={18} />
        </button>
      </div>
    </div>
  );
}
