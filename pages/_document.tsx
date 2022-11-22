import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src='https://js.jotform.com/JotFormCustomWidget.min.js' strategy='beforeInteractive' />
      </body>
    </Html>
  );
}
