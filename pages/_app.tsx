import * as React from 'react';
import type { AppType } from 'next/dist/shared/lib/utils';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '@/backend/router';
import '../styles/global.css';

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const getBaseUrl = () => {
  if (process.browser) return '';
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:3000`;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    return { url };
  },
  ssr: false,
})(App);
