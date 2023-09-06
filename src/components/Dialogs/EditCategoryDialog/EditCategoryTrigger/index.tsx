'use client';

import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

import { Root, Trigger } from '@radix-ui/react-dialog';

import EditCategoryPortal from '../EditCategoryPortal';

export interface EditCategoryTrigger {
  categoryId: string;
}

export default function EditCategoryTrigger({
  categoryId,
}: EditCategoryTrigger) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger>
        <FaRegEdit size={18} />
      </Trigger>
      <EditCategoryPortal
        setShowDialog={setShowDialog}
        categoryId={categoryId}
      />
    </Root>
  );
}
