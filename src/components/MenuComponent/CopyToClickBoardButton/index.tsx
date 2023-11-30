'use client';

import { useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export interface CopyToClickBoardButtonProps
  extends React.HTMLAttributes<HTMLElement> {
  companyInfos?: {
    slug: string;
    companyId: string;
  };
}

export default function CopyToClickBoardButton({
  companyInfos,
  ...rest
}: CopyToClickBoardButtonProps) {
  const [baseUrl, setBaseUrl] = useState(``);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${baseUrl}/produtos/${companyInfos?.slug}/${companyInfos?.companyId}`
    );
    toast.success(`Link copiado para a área de transferência!`);
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);
    const baseUrlParsed = `${parsedUrl.protocol}//${parsedUrl.host}`;

    setBaseUrl(baseUrlParsed); // Saída: http://localhost:3000
  }, []);

  return (
    <button type="button" onClick={copyToClipboard} {...rest}>
      <FaLink
        size="32"
        aria-label="Copiar link da loja"
        title="Copiar link da loja"
      />
    </button>
  );
}
