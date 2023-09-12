import { RouterParams } from '@/utils/types';

import styles from './styles.module.css';

export default function ManageCategories({ params }: RouterParams) {
  return (
    <div>
      <h1>Manage Categories</h1>
      <p>{params.slug}</p>
      <p>{params.companyId}</p>
    </div>
  );
}
