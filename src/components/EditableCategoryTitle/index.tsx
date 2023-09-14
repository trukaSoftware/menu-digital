import DeleteCategoryDialog from '../Dialogs/DeleteCategoryDialog';
import EditCategoryTrigger from '../Dialogs/EditCategoryDialog/EditCategoryTrigger';
import styles from './styles.module.css';

export interface EditableCategoryTitleProps {
  categoryName: string;
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
        <EditCategoryTrigger categoryId={categoryId} />
      </div>
    </div>
  );
}
