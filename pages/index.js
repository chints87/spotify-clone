import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Player from '@/components/Player';
import Sidebar from '@/components/Sidebar';
import Center from '@/components/Center';
import styles from '@/styles/scss/Homepage.module.scss';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <Head>
        <title>Title</title>
      </Head>
      <main>
        <Sidebar />
        <Center />
      </main>
      <Player />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: session,
  };
}
