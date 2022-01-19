import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import styles from '@/styles/scss/Login.module.scss';

export default function login({ providers }) {
  return (
    <div className={styles.login}>
      <Image
        src="https://links.papareact.com/9xl"
        alt=""
        width={150}
        height={150}
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.key}>
          <button type="button" className="login">
            Log in with
            {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
