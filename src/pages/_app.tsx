import 'nprogress/nprogress.css';
import 'styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import Script from 'next/script';

if (typeof document !== 'undefined')
  import('nprogress').then(NProgress => {
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', NProgress.start);
    Router.events.on('routeChangeComplete', NProgress.done);
    Router.events.on('routeChangeError', NProgress.done);
  });

const GTag = () => {
  if (!(process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_TRACKING_ID)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
        `}
      </Script>
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title key="title">Franck Muller Encrypto — Official Site</title>
        <meta
          key="description"
          name="description"
          content="Franck Muller introduces Mystery, a superb limited edition collection that celebrates the colourful characters and unique attributes of the personalities of web 3.0."
        />
      </Head>
      <GTag />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
