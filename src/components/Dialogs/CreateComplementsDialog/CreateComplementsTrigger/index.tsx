'use client';

import { useState } from 'react';
import { FaListUl } from 'react-icons/fa';

import { Root } from '@radix-ui/react-dialog';

import MenuItemButton from '../../../MenuItemButton';
import CreateComplementPortal from '../CreateComplementsPortal';

export default function CreateComplementTrigger() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <MenuItemButton
        Icon={<FaListUl size={32} color="E5E7EB" />}
        itemText="Adicionais"
      />

      <CreateComplementPortal setShowDialog={setShowDialog} />
    </Root>
  );
}
