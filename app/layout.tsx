'use client'

import { Inter } from 'next/font/google';
import './globals.css';
import { PassportProvider } from '@tiket/passport';

import '@tiket/passport-design-tokens/base.css';
import '@tiket/passport-design-tokens/font-loader.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PassportProvider>
          {children}
        </PassportProvider>
      </body>
    </html>
  );
}
