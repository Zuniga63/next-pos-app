import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';

interface Props {
  title?: string;
  children?: ReactNode;
}

export default function Layout({ title, children }: Props) {
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
  const TITLE = title ? `${title} - ${APP_NAME}` : APP_NAME;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>

      <div className="relative">
        <Header title={title} />
        <main>{children}</main>
      </div>
    </>
  );
}
