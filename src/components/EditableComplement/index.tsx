import DeleteComplementDialog from '../Dialogs/DeleteComplementDialog';
import EditComplementTrigger from '../Dialogs/EditComplementDialog/EditComplementTrigger';
import styles from './styles.module.css';

export interface EditableComplementTitleProps {
  complementName: string;
  complementId: string;
}

export default function EditableComplementTitle({
  complementName,
  complementId,
}: EditableComplementTitleProps) {
  return (
    <div className={styles.editableComplementTitleContent}>
      <h2 className={styles.editableComplementTitle}>{complementName}</h2>
      <div className={styles.editableComplementTitleButtonsWrapper}>
        <DeleteComplementDialog complementId={complementId} />
        <EditComplementTrigger complementId={complementId} />
      </div>
    </div>
  );
}
