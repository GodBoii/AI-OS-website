import React from 'react';
import { AppProps } from 'next/app';
import { Inter_Tight } from 'next/font/google';
import '../styles/globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${interTight.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;