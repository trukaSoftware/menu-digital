'use client';

import { useState } from 'react';
import { FaGripLines } from 'react-icons/fa';

import { Root } from '@radix-ui/react-dialog';

import MenuItemButton from '../../../MenuItemButton';
import CreateCategoryPortal from '../CreateCategoryPortal';

export default function CreateCategoryTrigger() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <MenuItemButton
        Icon={<FaGripLines size={32} color="E5E7EB" />}
        itemText="Categorias"
      />

      <CreateCategoryPortal setShowDialog={setShowDialog} />
    </Root>
  );
}
