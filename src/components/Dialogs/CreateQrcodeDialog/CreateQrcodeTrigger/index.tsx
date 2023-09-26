'use client';

import { useState } from 'react';
import { FaQrcode } from 'react-icons/fa';

import { Root } from '@radix-ui/react-dialog';

import MenuItemButton from '../../../MenuItemButton';
import CreateQrcodePortal from '../CreateQrcodePortal';

export default function CreateQrcodeTrigger() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <MenuItemButton
        Icon={<FaQrcode size={32} color="E5E7EB" />}
        itemText="QRcode"
      />
      <CreateQrcodePortal />
    </Root>
  );
}
