import { FaRegEdit } from 'react-icons/fa';

import DeleteCategoryDialog from '../Dialogs/DeleteCategoryDialog';
import styles from './styles.module.css';

export interface EditableCategoryTitleProps {
  categoryName?: string;
  categoryId: string;
}

export default function EditableCategoryTitle({
  categoryName,
  categoryId,
}: EditableCategoryTitleProps) {
  return (
    <div className={styles.editableCategoryTitleContent}>
      <h2 className={styles.editableCategoryTitle}>{categoryName}</h2>
      <div className={styles.editableCategoryTitleButtonsWrapper}>
        <DeleteCategoryDialog categoryId={categoryId} />
        <button type="button">
          <FaRegEdit size={18} />
        </button>
      </div>
    </div>
  );
}
