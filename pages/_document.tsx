import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta name="theme-color" content="#050505" />
                <link rel="icon" href="/icon.ico" />
                <link rel="apple-touch-icon" href="/icon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <body className="bg-[#050505] text-[#E2E8F0] antialiased selection:bg-primary/30 selection:text-white">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
