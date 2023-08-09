import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { BsCheck } from 'react-icons/bs';
import { FaGripLines } from 'react-icons/fa';

import { useCategories } from '@/hooks/useCategories';
import * as Select from '@radix-ui/react-select';

import styles from './styles.module.css';

export interface DefaultSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  field: ControllerRenderProps<
    {
      name: string;
      description: string;
      price: string;
      categoryId: string;
    },
    'categoryId'
  >;
  error: FieldError | undefined;
}

export default function DefaultSelect({ field, error }: DefaultSelectProps) {
  const { categories, gettingCategories } = useCategories();

  return (
    <Select.Root onValueChange={field.onChange} {...field}>
      <div className={styles.defaultSelectWrapper}>
        <div className={styles.defaultSelectContainerTriggerAndIcon}>
          <div className={styles.defaultSelectContainerIcon}>
            <FaGripLines />
          </div>
          <Select.Trigger
            className={styles.defaultSelectTrigger}
            aria-label="Categorias"
          >
            <Select.Value
              placeholder={
                gettingCategories ? `Buscando categorias...` : `Categorias`
              }
            />
          </Select.Trigger>
        </div>
        <Select.Portal>
          <Select.Content className={styles.defaultSelectContent}>
            <Select.Viewport className="SelectViewport">
              <Select.Group>
                <Select.Label className="SelectLabel">
                  Escolha uma categoria
                </Select.Label>
                {categories?.map((category) => (
                  <Select.Item
                    value={category.id}
                    className={styles.defaultSelectItem}
                    key={category.id}
                  >
                    <Select.ItemText>{category.name}</Select.ItemText>
                    <Select.ItemIndicator>
                      <BsCheck />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </div>
      {error ? (
        <span className={styles.defaultSelectErrorMessage}>
          {error.message}
        </span>
      ) : null}
    </Select.Root>
  );
}
