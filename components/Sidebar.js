import { useState, useEffect } from 'react';
import {
  HomeIcon, HeartIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon,
} from '@heroicons/react/outline';
import { useSession, signOut } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from 'atoms/playlistAtom';
import styles from '@/styles/scss/Sidebar.module.scss';
import useSpotify from '../hooks/useSpotify';

export default function Sidebar() {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log('This is the initial playlist', playlistId);

  const { data: session } = useSession();
  console.log(session);
  // On mount, the playlists of the user are fetched
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

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
        border: '1', borderColor: '#636363',
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
      <hr style={{
        border: '1', borderColor: '#636363',
      }}
      />
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className={styles.playlistName}
          onClick={() => setPlaylistId(playlist.id)}
          role="presentation"
        >
          {playlist.name}
        </div>
      )) }
    </div>
  );
}
