import '../styles/globals.scss';
import type { AppProps } from 'next/app';
// import dynamic from 'next/dynamic';

// const DynamicComponentWithNoSSR = dynamic((): any => import('../public/script'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
