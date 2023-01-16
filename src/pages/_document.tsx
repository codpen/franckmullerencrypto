import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/static/images/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/static/images/favicon-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/static/images/favicon-180x180.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
