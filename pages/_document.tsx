import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#f5f4ef" />
        <link rel="shortcut icon" href="/icon.ico" />
        <link rel="icon" type="image/x-icon" href="/icon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon-192.png"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
