import {
  Head, Html, Main, NextScript,
} from 'next/document';

export default function DocumentPage() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preload" as="font" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body>
        <Main />
        <NextScript />
        <div id="mainModalContainer" />
      </body>
    </Html>
  );
}
