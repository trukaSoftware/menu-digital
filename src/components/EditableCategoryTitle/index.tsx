import { FaRegEdit } from 'react-icons/fa';

import DeleteCategoryDialog from '../Dialogs/DeleteCategoryDialog';
import styles from './styles.module.css';

export interface EditableCategoryTitleProps {
  categoryName: string;
  categoryId: string;
  removeCategoryFromList: (categoryId: string) => void;
}

export default function EditableCategoryTitle({
  categoryName,
  categoryId,
  removeCategoryFromList,
}: EditableCategoryTitleProps) {
  return (
    <div className={styles.editableCategoryTitleContent}>
      <h2 className={styles.editableCategoryTitle}>{categoryName}</h2>
      <div className={styles.editableCategoryTitleButtonsWrapper}>
        <DeleteCategoryDialog
          categoryId={categoryId}
          removeCategoryFromList={removeCategoryFromList}
        />
        <button type="button">
          <FaRegEdit size={18} />
        </button>
      </div>
    </div>
  );
}
