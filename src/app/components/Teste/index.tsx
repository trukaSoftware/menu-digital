'use client';

import { Root, Trigger } from '@radix-ui/react-dialog';

import CreateCategoryPortal from '../CreateCategoryPortal';

export default function Teste() {
  return (
    <Root>
      <Trigger>Criar categoria</Trigger>
      <CreateCategoryPortal />
    </Root>
  );
}
