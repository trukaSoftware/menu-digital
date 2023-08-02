'use client';

import { Root, Trigger } from '@radix-ui/react-dialog';

import CreateCategoryPortal from '../CreateCategoryPortal';

export default function Teste({ companyId }: any) {
  return (
    <Root>
      <Trigger>Criar categoria</Trigger>
      <CreateCategoryPortal companyId={companyId} />
    </Root>
  );
}
