import '../styles/scss/globals.scss';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export function reportWebVitals(metric) {
  console.log(metric);
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    // allows instances of useSession() to share the session object across components,
    // by using React Context under the hood
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
