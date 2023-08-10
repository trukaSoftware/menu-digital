'use client';

import { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';

import { Root } from '@radix-ui/react-dialog';

import MenuItemButton from '../../../MenuItemButton';
import CreateProductPortal from '../CreateProductPortal';

export default function CreateProductTrigger() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <MenuItemButton
        Icon={<FaShoppingBasket size={32} color="E5E7EB" />}
        itemText="Produtos"
      />

      <CreateProductPortal setShowDialog={setShowDialog} />
    </Root>
  );
}
