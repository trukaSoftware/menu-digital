import './globals.css';

import { Inter } from 'next/font/google';

import { ReduxProvider } from '@/redux/ReduxProvider';
import ToastProvider from '@/ToastProvider';
import { ptBR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: `Meu Menu Digital`,
  description: `Sistema de Menu Digital para pequenos e grandes restaurantes.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" href="/images/icon-512x512.png" />
        </head>
        <body className={inter.className}>
          <ToastProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
