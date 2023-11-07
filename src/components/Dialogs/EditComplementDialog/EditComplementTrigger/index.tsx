'use client';

import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

import { Root, Trigger } from '@radix-ui/react-dialog';

import EditComplementPortal from '../EditComplementPortal';

export interface EditComplementTrigger {
  complementId: string;
}

export default function EditComplementTrigger({
  complementId,
}: EditComplementTrigger) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger aria-label="Editar adicional">
        <FaRegEdit size={18} />
      </Trigger>
      <EditComplementPortal
        setShowDialog={setShowDialog}
        complementId={complementId}
      />
    </Root>
  );
}
