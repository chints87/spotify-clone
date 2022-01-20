import {
  HomeIcon, HeartIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon,
} from '@heroicons/react/outline';
import { useSession, signOut } from 'next-auth/react';
import styles from '@/styles/scss/Sidebar.module.scss';

export default function Sidebar() {
  const { data: session, status } = useSession();
  console.log('in sidebar', status);
  console.log('in sidebar', session);
  return (
    <div className={styles.sideBar}>
      <button type="button" className="primary" onClick={() => signOut()}>
        <div className={styles.buttonContent}>
          <HomeIcon className="iconSize" />
          <p>Home</p>
        </div>
      </button>
      <button type="button" className="primary">
        <div className={styles.buttonContent}>
          <SearchIcon className="iconSize" />
          <p>Search</p>
        </div>
      </button>
      <button type="button" className="primary">
        <div className={styles.buttonContent}>
          <LibraryIcon className="iconSize" />
          <p>Your Library</p>
        </div>
      </button>
      <hr style={{
        border: '1', color: 'grey',
      }}
      />
      <button type="button" className="primary">
        <div className={styles.buttonContent}>
          <PlusCircleIcon className="iconSize" />
          <p>Create Playlist</p>
        </div>
      </button>
      <button type="button" className="primary">
        <div className={styles.buttonContent}>
          <HeartIcon className="iconSize" />
          <p>Your Songs</p>
        </div>
      </button>
      <button type="button" className="primary">
        <div className={styles.buttonContent}>
          <RssIcon className="iconSize" />
          <p>Your Episodes</p>
        </div>
      </button>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
      <div>Playlist</div>
    </div>
  );
}
