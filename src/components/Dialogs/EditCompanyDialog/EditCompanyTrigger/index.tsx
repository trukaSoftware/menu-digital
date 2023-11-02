'use client';

import { useState } from 'react';
import { MdEditSquare } from 'react-icons/md';

import { Root, Trigger } from '@radix-ui/react-dialog';

import EditCompanyPortal from '../EditCompanyPortal';
import styles from './styles.module.css';

export default function EditCompanyTrigger() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger className={styles.trigger} aria-label="Editar categoria">
        <MdEditSquare size={20} />
      </Trigger>
      <EditCompanyPortal setShowDialog={setShowDialog} />
    </Root>
  );
}
